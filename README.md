# PassShield-K8s

PassShield-K8s is a comprehensive solution for ensuring password security. It evaluates the strength of your passwords and checks if they have been compromised in any data breaches using the Have I Been Pwned API. The application features a React-based frontend and a FastAPI backend, both of which are containerized using Docker and served via Nginx for optimal performance and security.

The deployment leverages Google Kubernetes Engine (GKE) with an Ingress Nginx controller to manage traffic, and SSL certificates from Let's Encrypt and Cert Manager to secure communications. The infrastructure is provisioned using Terraform, creating a custom VPC in Google Cloud Platform (GCP). Additionally, Cast.ai is integrated to monitor and optimize Kubernetes costs, providing real-time cost reports and suggestions for cost-saving measures.

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Docker Setup](#docker-setup)
- [Kubernetes Deployment](#kubernetes-deployment)
- [GKE Deployment](#gke-deployment)

## Features

- Password strength checking
- Password breach checking using the Have I Been Pwned API
- Responsive UI built with React and Tailwind CSS
- Backend API built with FastAPI
- Dockerized frontend and backend with Nginx
- Deployed to GKE with Ingress Nginx controller and SSL certificates
- Custom VPC in GCP using Terraform
- Cost monitoring and optimization using Cast.ai

## Architecture

The application consists of two main components:

1. **Frontend**: A React application that provides the user interface for checking password strength and breaches.
2. **Backend**: A FastAPI application that provides the API endpoints for checking password strength and breaches.

## Prerequisites

- Docker
- Kubernetes CLI (`kubectl`)
- Google Cloud SDK (`gcloud`)
- A Google Cloud Platform (GCP) project
- A custom domain from GoDaddy/Cloudflare/Namecheap or any other provider

## Accessing a CloudShell terminal inside GCP to setup the application

- Open the Google Cloud Console and open a CloudShell session which will help to create the infrastructure and deploy the application to Google Kubernetes Engine
- Clone the application source code:

    ```sh
    git clone https://github.com/devops-maestro17/PassShield-K8s.git

    # Navigate to the directory
    cd PassShield-K8s/
    ```
- Review the infrastructure on GCP using the Terraform configuration which is provided in the source code inside `terraform` folder.
    ```sh
    cd terraform/

    # Initialize terraform inside the working directory
    terraform init

    # Review the infrastructure which will be created
    terraform plan 
    ```


> This will create a custom VPC with private subnet, firewall rules allowing HTTP and HTTPS traffic and a Google Kubernetes engine cluster with 2 nodes. If you want to deploy the infrastructure in a differet region then modify the terraform.tfvars file before deploying. The file contains the variables which are needed for during the deployment. Provide the GCP project ID and the region as shown below:

![alt text](image-2.png)

## Docker Setup

### Build the docker images for frontend and backend

1. Build frontend image:
    ```sh
    cd frontend
    docker build -t frontend-app:1.0 .
    ```
2. Build backend image:
    ```sh
    cd backend
    docker build -t backend-app:1.0 .
    ```

2. Access the frontend at `http://localhost:3000` and the backend at `http://localhost:8000`.

## Kubernetes Deployment

### Create Kubernetes Manifests

1. Create a namespace for the application:
    ```sh
    kubectl create namespace password-checker
    ```

2. Apply the backend deployment and service:
    ```sh
    kubectl apply -f k8s-manifests/backend-deployment.yaml -n password-checker
    ```

3. Apply the frontend deployment and service:
    ```sh
    kubectl apply -f k8s-manifests/frontend-deployment.yaml -n password-checker
    ```

4. Apply the ingress resource:
    ```sh
    kubectl apply -f k8s-manifests/ingress.yaml -n password-checker
    ```

### Install Ingress Nginx Controller

1. Add the ingress-nginx repository:
    ```sh
    helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
    helm repo update
    ```

2. Install the ingress-nginx controller:
    ```sh
    helm install ingress-nginx ingress-nginx/ingress-nginx --namespace ingress-nginx --create-namespace
    ```

## GKE Deployment

### Set Up GKE Cluster

1. Authenticate with GCP:
    ```sh
    gcloud auth login
    ```

2. Set the project:
    ```sh
    gcloud config set project YOUR_PROJECT_ID
    ```

3. Create a GKE cluster:
    ```sh
    gcloud container clusters create password-checker-cluster --zone YOUR_ZONE
    ```

4. Get credentials for the cluster:
    ```sh
    gcloud container clusters get-credentials password-checker-cluster --zone YOUR_ZONE
    ```

### Deploy the Application

1. Follow the steps in the Kubernetes Deployment section to deploy the application to the GKE cluster.

### Configure DNS

1. Get the external IP of the ingress controller:
    ```sh
    kubectl get svc -n ingress-nginx
    ```

2. Update your DNS records to point to the external IP of the ingress controller.

## Environment Variables

### Backend

- `ALLOWED_ORIGINS`: A comma-separated list of allowed origins for CORS.