provider "google" {
  project = var.project_id
  region = var.region
}

terraform {
  required_version = ">= 1.0"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 6.0"
    }
  }
}

module "networking" {
  source = "./modules/networking"
  
  project_id = var.project_id
  region = var.region
  private_subnet_cidr_range = var.private_subnet_cidr_range
  pod_cidr_range = var.pod_cidr_range
  service_cidr_range = var.service_cidr_range
  apis = var.apis
}

module "gke" {
  source = "./modules/gke"
  cluster_name = var.cluster_name
  cluster_location = var.cluster_location
  initial_node_count = var.initial_node_count
}