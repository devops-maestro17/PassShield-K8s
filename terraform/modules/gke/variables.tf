variable "project_id" {
  description = "The project ID to deploy resources to"
  type        = string
}

variable "cluster_name" {
  description = "The name of the GKE cluster"
  type        = string
}

variable "cluster_location" {
  description = "The location to deploy the GKE cluster"
  type        = string
}

variable "initial_node_count" {
  description = "The number of nodes to create in the GKE cluster"
  type        = number
}

variable "vpc" {
  description = "The VPC to deploy the GKE cluster in"
  type        = string
}

variable "private_subnet" {
  description = "The private subnet to deploy the GKE cluster in"
  type        = string
}