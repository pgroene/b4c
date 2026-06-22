output "resource_group_name" {
  description = "Name of the Azure resource group"
  value       = azurerm_resource_group.main.name
}

output "acr_login_server" {
  description = "ACR login server (use as Docker registry host)"
  value       = azurerm_container_registry.acr.login_server
}

output "acr_admin_username" {
  description = "ACR admin username (for docker login and GitHub Actions secret)"
  value       = azurerm_container_registry.acr.admin_username
  sensitive   = true
}

output "acr_admin_password" {
  description = "ACR admin password (for docker login and GitHub Actions secret)"
  value       = azurerm_container_registry.acr.admin_password
  sensitive   = true
}

output "container_app_fqdn" {
  description = "Public HTTPS URL of the deployed prototype"
  value       = "https://${azurerm_container_app.prototype.latest_revision_fqdn}"
}

output "container_app_name" {
  description = "Container App name (needed to update the image in CI/CD)"
  value       = azurerm_container_app.prototype.name
}
