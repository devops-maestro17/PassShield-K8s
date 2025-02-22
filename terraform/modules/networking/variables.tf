variable "project_id" {
    description = "The project ID to deploy resources to"
    type = string
}

variable "region" {
    description = "The region to deploy resources to"
    type = string
}

variable "apis" {
    description = "The APIs to enable on the project"
    type = list(string)
}

variable "private_subnet_cidr_range" {
    description = "The CIDR range for the private subnet"
    type = string
}

variable "pod_cidr_range" {
    description = "The CIDR range for the pod IP addresses"
    type = string
}

variable "service_cidr_range" {
    description = "The CIDR range for the service IP addresses"
    type = string
}