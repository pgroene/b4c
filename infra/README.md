# B4Code Prototype — Infra & Deployment

The prototype is deployed as a Docker container on **Azure Container Apps**, fronted by Azure's built-in HTTPS ingress. A simple password gate protects the public URL — the password is injected at container start via the `DEMO_PASSWORD` environment variable (never baked into the image).

---

## Architecture

```
GitHub Actions (push to main)
  │
  ├─ docker build prototype/ → push to ACR
  └─ az containerapp update → new revision live

Azure Container Registry (ACR)
  └─ b4codeacrproduction.azurecr.io/prototype:<sha>

Azure Container Apps
  └─ nginx serves /usr/share/nginx/html
       ├─ /config.js  (generated at start from DEMO_PASSWORD env var)
       └─ /index.html → React SPA → PasswordGate
```

---

## Prerequisites

| Tool | Version | Install |
|------|---------|---------|
| Terraform | ≥ 1.6 | https://developer.hashicorp.com/terraform/install |
| Azure CLI | latest | `winget install Microsoft.AzureCLI` |
| Docker | latest | https://docs.docker.com/get-docker/ |

---

## First-time setup (one-off)

### 1. Authenticate to Azure

```powershell
az login
az account set --subscription "<your-subscription-id>"
```

### 2. Provision infrastructure with Terraform

```powershell
cd infra/terraform

# Create your tfvars file
Copy-Item terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars — set demo_password to something memorable

terraform init
terraform plan -out tfplan
terraform apply tfplan
```

Terraform will output:
- `acr_login_server` — e.g. `b4codeacrproduction.azurecr.io`
- `container_app_name` — e.g. `ca-b4code-production-prototype`
- `resource_group_name` — e.g. `rg-b4code-production`
- `container_app_fqdn` — the live HTTPS URL

### 3. Build and push the first image manually

```powershell
cd prototype

# Log in to ACR (get creds from terraform output)
$ACR = "b4codeacrproduction.azurecr.io"
az acr login --name b4codeacrproduction

docker build -t $ACR/prototype:latest .
docker push $ACR/prototype:latest
```

### 4. Add GitHub Actions secrets

Go to your repo → **Settings → Secrets → Actions** and add:

| Secret | Value |
|--------|-------|
| `ACR_LOGIN_SERVER` | from `terraform output acr_login_server` |
| `ACR_USERNAME` | from `terraform output -raw acr_admin_username` |
| `ACR_PASSWORD` | from `terraform output -raw acr_admin_password` |
| `CONTAINER_APP_NAME` | from `terraform output container_app_name` |
| `RESOURCE_GROUP_NAME` | from `terraform output resource_group_name` |
| `AZURE_CREDENTIALS` | service principal JSON (see below) |

**Create the service principal for GitHub Actions:**

```bash
az ad sp create-for-rbac \
  --name "sp-b4code-github-actions" \
  --role contributor \
  --scopes /subscriptions/<subscription-id>/resourceGroups/rg-b4code-production \
  --sdk-auth
```

Copy the entire JSON output as the `AZURE_CREDENTIALS` secret.

---

## Day-to-day deploys

Push any change to `prototype/` on `main` → GitHub Actions builds and deploys automatically.

To trigger manually: **Actions → Deploy prototype to Azure Container Apps → Run workflow**.

---

## Changing the demo password

```powershell
az containerapp update \
  --name ca-b4code-production-prototype \
  --resource-group rg-b4code-production \
  --set-env-vars "DEMO_PASSWORD=new-password"
```

No rebuild required — the container restarts and injects the new password.

---

## Scaling & cost

- `min_replicas = 0` — scales to zero when idle (no traffic = no cost)
- Azure Container Apps Basic plan ~ €5–15/month for low-traffic demo usage
- ACR Basic ~ €5/month

To keep it always warm (faster first load):

```hcl
# infra/terraform/terraform.tfvars
min_replicas = 1
```

Then `terraform apply`.
