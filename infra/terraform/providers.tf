terraform {
  required_version = ">= 1.6"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.110"
    }
  }

  # Recommended: store state in Azure Blob Storage so the team shares it.
  # Uncomment and fill in your values before running `terraform init`.
  #
  # backend "azurerm" {
  #   resource_group_name  = "rg-tfstate"
  #   storage_account_name = "b4codetfstate"
  #   container_name       = "tfstate"
  #   key                  = "b4code-prototype.tfstate"
  # }
}

provider "azurerm" {
  features {}
}
