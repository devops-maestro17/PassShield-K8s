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