output "vpc_self_link" {
  value = google_compute_network.vpc.self_link
}

output "private_subnet_self_link" {
  value = google_compute_subnetwork.private.self_link
}

output "project_id" {
  value = var.project_id
}