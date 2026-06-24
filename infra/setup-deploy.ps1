#!/usr/bin/env pwsh
<#
.SYNOPSIS
  One-shot deployment setup for the B4Code prototype.
  Run this once to provision Azure infrastructure and wire GitHub Actions secrets.

.DESCRIPTION
  1. Switches to the correct Azure subscription
  2. Provisions all Azure resources with Terraform (ACR + Container Apps env + Container App)
  3. Creates a service principal for GitHub Actions (Contributor on the resource group)
  4. Sets all 6 required GitHub Actions secrets

.PREREQUISITES
  - az CLI logged in:        az login
  - Terraform installed:     terraform -version
  - GitHub CLI logged in:    gh auth login
  - gh has access to repo:   pgroene/b4c

.USAGE
  cd C:\workspaces\b4c
  .\infra\setup-deploy.ps1
  .\infra\setup-deploy.ps1 -DemoPassword "MySecret123!" -SkipTerraform
#>

param(
  [string]$DemoPassword   = "",        # demo login password; prompted if empty
  [string]$DemoUsername   = "b4code",  # demo login username
  [string]$Subscription   = "7fa0998a-250d-4840-81f3-cbc92e937e4e",  # Vitas Personal pgroenewegen
  [string]$GithubRepo     = "pgroene/b4c",
  [switch]$SkipTerraform               # skip terraform apply (if infra already exists)
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Write-Step([string]$msg) { Write-Host "`n== $msg ==" -ForegroundColor Cyan }
function Write-OK([string]$msg)   { Write-Host "  ✓ $msg"    -ForegroundColor Green }
function Write-Warn([string]$msg) { Write-Host "  ⚠ $msg"    -ForegroundColor Yellow }

# ── 0. Prompt for password if not supplied ────────────────────────────────────
if (-not $DemoPassword) {
  $DemoPassword = Read-Host "Enter demo password for the login gate (min 8 chars)"
  if ($DemoPassword.Length -lt 8) {
    Write-Error "Password must be at least 8 characters."
    exit 1
  }
}

# ── 1. Switch subscription ────────────────────────────────────────────────────
Write-Step "Switching Azure subscription"
az account set --subscription $Subscription
$subName = az account show --query "name" -o tsv
Write-OK "Active subscription: $subName"

# ── 2. Terraform — provision infrastructure ───────────────────────────────────
$TfDir = "$PSScriptRoot\terraform"

if (-not $SkipTerraform) {
  Write-Step "Terraform init + apply"

  # Write tfvars (container_image is a placeholder; the first real deploy via
  # GitHub Actions will update the image after ACR has been populated)
  $TfVarsPath = "$TfDir\terraform.tfvars"
  @"
project_name     = "b4code"
environment      = "production"
location         = "westeurope"
demo_username    = "$DemoUsername"
demo_password    = "$DemoPassword"
container_image  = "mcr.microsoft.com/azuredocs/containerapps-helloworld:latest"
"@ | Set-Content $TfVarsPath -Encoding utf8
  Write-OK "Wrote terraform.tfvars"

  Push-Location $TfDir
  try {
    terraform init -upgrade
    terraform apply -auto-approve
  } finally {
    Pop-Location
  }
  Write-OK "Terraform apply complete"
} else {
  Write-Warn "Skipping Terraform (--SkipTerraform flag set)"
}

# ── 3. Read Terraform outputs ─────────────────────────────────────────────────
Write-Step "Reading Terraform outputs"
Push-Location $TfDir
$RG           = (terraform output -raw resource_group_name)
$AcrServer    = (terraform output -raw acr_login_server)
$AcrUsername  = (terraform output -raw acr_admin_username)
$AcrPassword  = (terraform output -raw acr_admin_password)
$AppName      = (terraform output -raw container_app_name)
Pop-Location

Write-OK "Resource group:  $RG"
Write-OK "ACR server:      $AcrServer"
Write-OK "Container app:   $AppName"

# ── 4. Create service principal for GitHub Actions ────────────────────────────
Write-Step "Creating service principal for GitHub Actions"
$SpName = "sp-b4code-github-actions"

# Check if SP already exists
$ExistingSp = az ad sp list --display-name $SpName --query "[0].appId" -o tsv 2>$null

if ($ExistingSp) {
  Write-Warn "SP '$SpName' already exists (appId: $ExistingSp). Creating new credentials..."
  # Reset credentials and get JSON in azure/login@v2 format
  $SpJson = az ad sp credential reset --id $ExistingSp --output json
  $Sp = $SpJson | ConvertFrom-Json
  $AzureCreds = [ordered]@{
    clientId       = $Sp.appId
    clientSecret   = $Sp.password
    subscriptionId = (az account show --query id -o tsv)
    tenantId       = $Sp.tenant
  } | ConvertTo-Json -Compress
} else {
  $RgId = az group show --name $RG --query id -o tsv
  $SpJson = az ad sp create-for-rbac `
    --name $SpName `
    --role Contributor `
    --scopes $RgId `
    --sdk-auth `
    --output json
  $AzureCreds = $SpJson
  Write-OK "Service principal created: $SpName"
}

# ── 5. Set GitHub Actions secrets ─────────────────────────────────────────────
Write-Step "Setting GitHub Actions secrets on $GithubRepo"

$Secrets = @{
  AZURE_CREDENTIALS    = $AzureCreds
  ACR_LOGIN_SERVER     = $AcrServer
  ACR_USERNAME         = $AcrUsername
  ACR_PASSWORD         = $AcrPassword
  CONTAINER_APP_NAME   = $AppName
  RESOURCE_GROUP_NAME  = $RG
}

foreach ($key in $Secrets.Keys) {
  $val = $Secrets[$key]
  $val | gh secret set $key --repo $GithubRepo
  Write-OK "Secret set: $key"
}

# ── 6. Summary ────────────────────────────────────────────────────────────────
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host " B4Code deploy setup complete!" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host " Subscription : $subName"
Write-Host " Resource group: $RG"
Write-Host " ACR           : $AcrServer"
Write-Host " Container App : $AppName"
Write-Host ""
Write-Host " Next step: push to main (or trigger manually):" -ForegroundColor Yellow
Write-Host "   gh workflow run deploy.yml --repo $GithubRepo" -ForegroundColor Yellow
Write-Host ""
Write-Host " Live URL will appear in the workflow run output."
Write-Host " Demo login: $DemoUsername / <your password>"
