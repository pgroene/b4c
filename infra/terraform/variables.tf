variable "location" {
  description = "Azure region for all resources"
  type        = string
  default     = "westeurope"
}

variable "project_name" {
  description = "Short project name used as a prefix for resource names (lowercase, no spaces)"
  type        = string
  default     = "b4code"
}

variable "environment" {
  description = "Deployment environment tag (e.g. staging, production)"
  type        = string
  default     = "production"
}

variable "container_image" {
  description = "Full ACR image reference, e.g. b4codeacr.azurecr.io/prototype:latest"
  type        = string
}

variable "demo_username" {
  description = "Username for the demo login gate (injected as DEMO_USERNAME env var into the container)"
  type        = string
  default     = "b4code"
}

variable "demo_password" {
  description = "Password for the demo login gate (injected as DEMO_PASSWORD env var into the container)"
  type        = string
  sensitive   = true
}

variable "cpu" {
  description = "Container CPU allocation (cores)"
  type        = number
  default     = 0.25
}

variable "memory" {
  description = "Container memory allocation"
  type        = string
  default     = "0.5Gi"
}

variable "min_replicas" {
  description = "Minimum number of container replicas (0 = scale to zero when idle)"
  type        = number
  default     = 0
}

variable "max_replicas" {
  description = "Maximum number of container replicas"
  type        = number
  default     = 2
}
