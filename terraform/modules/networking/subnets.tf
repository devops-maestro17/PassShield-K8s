resource "google_compute_subnetwork" "private" {
  name = "private"
  ip_cidr_range = var.private_subnet_cidr_range
  region = var.region
  network = google_compute_network.vpc.id
  private_ip_google_access = true
  stack_type = "IPV4_ONLY"

  secondary_ip_range {
    range_name = "pods"
    ip_cidr_range = var.pod_cidr_range
  }

  secondary_ip_range {
    range_name = "services"
    ip_cidr_range = var.service_cidr_range
  }

}