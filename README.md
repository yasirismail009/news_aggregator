# Running the Frontend Application in Docker

This project can be run in a Docker container for easy setup and deployment. Follow the steps below to build and run the project in Docker.

## Prerequisites

- Docker must be installed on your machine. [Install Docker](https://docs.docker.com/get-docker/) if you haven't already.

## Running the Project

### 1. Clone the repository (if you haven't already):

```bash
git clone [news_aggregator](https://github.com/yasirismail009/news_aggregator.git)
cd news_aggregator

docker build -t news_aggregator .
docker run -p 3000:3000 news_aggregator
docker ps
docker stop <container-id>
