# PassShield-K8s

This project is a Password Strength Checker application that helps users check the strength of their passwords and ensures they haven't been compromised in any known data breaches. The application consists of a frontend built with React and a backend built with FastAPI.

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Local Development](#local-development)
- [Docker Setup](#docker-setup)
- [Kubernetes Deployment](#kubernetes-deployment)
- [GKE Deployment](#gke-deployment)
- [Environment Variables](#environment-variables)
- [License](#license)

## Features

- Password strength checking
- Password breach checking using the Have I Been Pwned API
- Responsive UI built with React and Tailwind CSS
- Backend API built with FastAPI

## Architecture

The application consists of two main components:

1. **Frontend**: A React application that provides the user interface for checking password strength and breaches.
2. **Backend**: A FastAPI application that provides the API endpoints for checking password strength and breaches.

## Prerequisites

- Docker
- Docker Compose
- Kubernetes CLI (`kubectl`)
- Google Cloud SDK (`gcloud`)
- A Google Cloud Platform (GCP) project

## Local Development

### Frontend

1. Navigate to the `frontend` directory:
    ```sh
    cd frontend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the development server:
    ```sh
    npm start
    ```

### Backend

1. Navigate to the [backend](http://_vscodecontentref_/1) directory:
    ```sh
    cd backend
    ```

2. Create a virtual environment and activate it:
    ```sh
    python -m venv venv
    source venv/bin/activate
    ```

3. Install dependencies:
    ```sh
    pip install -r requirements.txt
    ```

4. Start the FastAPI server:
    ```sh
    uvicorn app.main:app --reload
    ```

## Docker Setup

### Build and Run with Docker Compose

1. Build and start the services:
    ```sh
    docker-compose up --build
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

## License

This project is licensed under the MIT License. See the LICENSE file for details.
