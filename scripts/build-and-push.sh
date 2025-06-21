#!/bin/bash

# Build and push script
set -e

# Variables
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
AWS_REGION=us-east-1
IMAGE_NAME=ecommerce-api
IMAGE_TAG=${1:-latest}

# Login to ECR
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

# Build image
echo "Building Docker image..."
docker build -t $IMAGE_NAME:$IMAGE_TAG application/backend/

# Tag image
docker tag $IMAGE_NAME:$IMAGE_TAG $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$IMAGE_NAME:$IMAGE_TAG

# Push image
echo "Pushing to ECR..."
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$IMAGE_NAME:$IMAGE_TAG

echo "Build and push completed successfully!"
