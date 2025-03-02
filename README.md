# Deploying a 2-Tier Application to Google Kubernetes Engine with HTTPS, Ingress Nginx and Cost Optimization using Cast.ai

PassShield-K8s is a comprehensive solution for ensuring password security. It evaluates the strength of your passwords and checks if they have been compromised in any data breaches using the Have I Been Pwned API. The application features a React-based frontend and a FastAPI backend, both of which are containerized using Docker and served via Nginx for optimal performance and security.

The deployment leverages Google Kubernetes Engine (GKE) with an Ingress Nginx controller to manage traffic, and SSL certificates from Let's Encrypt and Cert Manager to secure communications. The infrastructure is provisioned using Terraform, creating a custom VPC in Google Cloud Platform (GCP). Additionally, Cast.ai is integrated to monitor and optimize Kubernetes costs, providing real-time cost reports and suggestions for cost-saving measures.

<img width="500" alt="image" src="https://github.com/user-attachments/assets/a9b69aa7-03be-486f-86d9-b87c2b1944e1" /> <img width="500" alt="image" src="https://github.com/user-attachments/assets/337bd5fc-cdb8-458b-b8ee-e29a4d8b93c3" />

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Deploy the infrastructure using Terraform](#deploy-the-infrastructure-using-terraform)
- [Docker Setup](#docker-setup)
- [Kubernetes Deployment](#kubernetes-deployment)
- [Setting up Cast.AI](#setting-up-castai)

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

1. **Frontend**: A React application that provides the user interface.
2. **Backend**: A FastAPI application that provides the API endpoints for checking password strength and breaches.

### Project Structure


```sh
.
├── README.md
├── backend
│   ├── Dockerfile
│   ├── app
│   │   ├── main.py
│   │   └── password_utils.py
│   └── requirements.txt
├── frontend
│   ├── Dockerfile
│   ├── README.md
│   ├── nginx.prod.conf
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── public
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src
│   │   ├── components
│   │   │   ├── App.js
│   │   │   └── PasswordChecker.js
│   │   ├── index.css
│   │   ├── index.js
│   │   └── services
│   │       └── api.js
│   └── tailwind.config.js
├── k8s-manifests
│   ├── backend-deployment.yaml
│   ├── certificate.yaml
│   ├── cluster-issuer.yaml
│   ├── frontend-deployment.yaml
│   └── ingress.yaml
└── terraform
    ├── main.tf
    ├── modules
    │   ├── gke
    │   │   ├── gke-nodes.tf
    │   │   ├── gke.tf
    │   │   └── variables.tf
    │   └── networking
    │       ├── apis.tf
    │       ├── firewall.tf
    │       ├── nat-gateway.tf
    │       ├── outputs.tf
    │       ├── subnets.tf
    │       ├── variables.tf
    │       └── vpc.tf
    ├── terraform.tfvars
    └── variables.tf
```

The `frontend` and `backend` folders contain the source code and respective Dockerfiles for the frontend and backend of the application. The infrastucture which will be created in GCP is defined in `terraform` folder which uses reusable modules for VPC and GKE cluster. The Kubernetes manifests for the application is defined in `k8s-maniefests` folder which contains the Deployment, Service, Ingress, ClusterIssuer and Certificates which are needed for the application deployment. 

## Prerequisites

- Docker
- Kubernetes CLI (`kubectl`)
- Google Cloud SDK (`gcloud`)
- A Google Cloud Platform (GCP) project
- A custom domain from GoDaddy/Cloudflare/Namecheap or any other provider

## Deploy the infrastructure using Terraform

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

    <img width="589" alt="image" src="https://github.com/user-attachments/assets/4ca6b1b7-9919-4948-b84d-4a755210afaf" />

- Deploy the infrastructure
    ```sh
    # Review the changes once again
    terraform plan

    # Deploy the infrastructure
    terraform apply

    # Enter yes
    
    ```
    
    ![image](https://github.com/user-attachments/assets/331f76c1-86d6-49ad-9e80-4a943e1d4cf6)

    It will take 15-20 mins to create the required infrastructure. You can verify the creation of VPC, subnet, firewall rules and GKE cluster by navigating to the GCP console once the infrastructure is created.
  
  ![image](https://github.com/user-attachments/assets/861c3974-9a21-474a-879c-94f3e307c691)

GKE Cluster:

![image](https://github.com/user-attachments/assets/48d0513b-5860-4704-9480-884814f2b4b3)

Custom VPC and Private Subnet:

![image](https://github.com/user-attachments/assets/c7eb0528-20a1-4692-9f9d-f7e8dc771b5e)

![image](https://github.com/user-attachments/assets/eeace291-2b03-496a-8a60-4742657d37da)


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
The docker images are already available in my public Dockerhub repository with the tags `cloudmaestro/frontend:1.0` and `cloudmaestro/backend:1.0`

## Kubernetes Deployment

### Review the Kubernetes Manifests

- Frontend deployment and service:
    ```yaml
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: frontend
    spec:
      replicas: 3
      selector:
        matchLabels:
          app: frontend
      template:
        metadata:
          labels:
            app: frontend
        spec:
          containers:
          - name: frontend
            image: cloudmaestro/frontend:1.0
            ports:
            - containerPort: 80
    
    ---
    apiVersion: v1
    kind: Service
    metadata:
      name: frontend-service
    spec:
      selector:
        app: frontend
      ports:
        - protocol: TCP
          port: 80
          targetPort: 80
    ```
    The frontend deployment is using the image `cloudmaestro/frontend:1.0` and uses 80 as the container Port and service port.
  
- Backend deployment and service
    ```yaml
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: backend
    spec:
      replicas: 3
      selector:
        matchLabels:
          app: backend
      template:
        metadata:
          labels:
            app: backend
        spec:
          containers:
          - name: backend
            image: cloudmaestro/backend:1.0
            ports:
            - containerPort: 8000
            env:
            - name: ALLOWED_ORIGINS
              value: "http://frontend-service"
        ---
        apiVersion: v1
        kind: Service
        metadata:
          name: backend-service
        spec:
          selector:
            app: backend
          ports:
            - protocol: TCP
              port: 80
              targetPort: 8000
    ```
    The backend application uses `cloudmaestro/backend:1.0` as the container image and port 8000 as the container port and 80 as the service port.
  
- Ingress
  ```yaml
  apiVersion: networking.k8s.io/v1
    kind: Ingress
    metadata:
      name: password-checker-ingress
    spec:
      tls:
      - hosts:
        - <your_domain_name_here>
        secretName: tls-cert
      ingressClassName: nginx
      rules:
      - host: <your_domain_name_here>
        http:
          paths:
          - path: /api
            pathType: Prefix
            backend:
              service:
                name: backend-service
                port:
                  number: 80
          - path: /
            pathType: Prefix
            backend:
              service:
                name: frontend-service
                port:
                  number: 80
  ```
  The ingress uses the domain name which you will provide and it will route the traffic to the frontend service based on `/` path and backend service based on `/api` path. It also uses `tls-cert` secret which is created automatically when the Certificate manifest is created. Provide your domain name in the `hosts` value to get started. Below are the configuration files for ClusterIssuer and Certificate.

- ClusterIssuer:
  ```yaml
    apiVersion: cert-manager.io/v1
    kind: ClusterIssuer
    metadata:
      name: letsencrypt-production
    spec:
      acme:
        server: https://acme-v02.api.letsencrypt.org/directory
        email: rajdeep_deogharia@outlook.com
        privateKeySecretRef:
          name: pwned-secret-key
        solvers:
        - http01:
            ingress:
              ingressClassName: nginx
  ```
- Certificate
    ```yaml
    apiVersion: cert-manager.io/v1
    kind: Certificate
    metadata:
      name: password-checker-certificate
    spec:
      secretName: tls-cert
      dnsNames:
      - app.devops-maestro.xyz
      issuerRef:
        name: letsencrypt-production
        kind: ClusterIssuer
    ```
    
### Connect to the Kubernetes cluster in CloudShell
    ```sh
    gcloud container clusters get-credentials <your-cluster-name> --zone <your-cluster-zone> --project <your-project-id>
    ```
### Verify connection by using the following command:
    ```sh
    kubectl get nodes
    ```
### Install cert-manager:
    ```sh
    kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.17.0/cert-manager.yaml
    ```
### Apply the kubernetes deployment and service
    ```sh
        kubectl apply -f frontend-deployment.yaml -f frontend-deployment.yaml
    ```
### Verify the pods and services are running
    ```sh
        kubectl get pods
        kubectl get svc
    ```

![image](https://github.com/user-attachments/assets/1479381d-b0c0-47e5-b0b7-22a9573ac3e2)

> For the next step, you need a custom domain. In this project I have used my custom domain `app.devops-maestro.xyz` as defined in the `ingress.yaml` file. 

### Apply the Ingress manifest with your custom domain
    ```sh
        kubectl apply -f ingress.yaml

        # Review the ingress configuration
        kubectl get ingress
    ```
    
![image](https://github.com/user-attachments/assets/cf4cc46b-e0d3-4b3a-84b3-cf6a4259c2f5)

### Install Ingress Nginx Controller using the following commands:
    ```sh
    # Create a ClusterRoleBinding
    kubectl create clusterrolebinding cluster-admin-binding \
      --clusterrole cluster-admin \
      --user $(gcloud config get-value account)

    # Apply the ingress-nginx manifests
    kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.12.0/deploy/static/provider/cloud/deploy.yaml
    ```
### Verify the Ingress Nginx controller configuration
    ```sh
        kubectl get svc -n ingress-nginx
    ```
> Fetch the External IP address of the `ingress-nginx-controller` and add it as an A record under your domain name provider

<img width="700" alt="image" src="https://github.com/user-attachments/assets/ac45ed9c-84f6-4818-8ddb-3a0230c317d0" />

### Apply the ClusterIssuer and Certificate manifests

    ```sh
    kubectl apply -f cluster-issuer.yaml -f certificate.yaml
    ```

> Re-apply the Ingress manifest by using `kubectl apply -f ingress.yaml` command and then hit the URL `https://<your-domain-name>` in your browser to access the website.

![image](https://github.com/user-attachments/assets/a9b69aa7-03be-486f-86d9-b87c2b1944e1)

### You can also view the SSL certificate and issuer details by using the below command:
    ```sh
        curl -v https://<your-domain-name>
    ```

<img width="626" alt="image" src="https://github.com/user-attachments/assets/9bc1d08b-1a0e-4005-b35f-1f90b16e59b7" />

## Setting up Cast.AI

- Navigate to the Cast.ai console by visting this URL `https://console.cast.ai/` and create a new account
- Click on Connect Cluster button to connect Cast.ai to your GKE cluster
- Choose GKE from the Provider options and run the script in your GKE cluster which is provided in Cast.ai console
- Click on `I ran this script` button and wait for cast.ai to connect to your cluster
- Click on `Enable Cast AI`
- Now select `Cost Monitoring` option and `Network cost use metrics` and then run the script provided inside your GKE cluster.
- Once it is completed, click again on `I ran this script`
- Navigate to your cluster in the Cast.ai console and the dashboard will appear as shown below:

![image](https://github.com/user-attachments/assets/a7aa62c4-0a63-4692-9f02-f09a4d235eff)

![image](https://github.com/user-attachments/assets/8bdb4801-0af7-4aba-90b2-dfd27d9b94f3)
