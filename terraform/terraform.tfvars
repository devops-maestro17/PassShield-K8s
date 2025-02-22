project_id       = "your-project-id"
region           = "us-central1"
cluster_location = "us-central1-a"
apis = [
  "compute.googleapis.com",
  "container.googleapis.com",
  "logging.googleapis.com",
  "secretmanager.googleapis.com"
]
private_subnet_cidr_range = "10.0.32.0/19"
pod_cidr_range            = "172.16.0.0/14"
service_cidr_range        = "172.20.0.0/18"
cluster_name              = "gke-cluster"
initial_node_count        = 2