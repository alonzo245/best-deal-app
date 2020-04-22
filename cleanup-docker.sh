#!/bin/bash
docker ps -a
docker volume ls
docker image ls
docker network ls
docker container ls

echo "staring cleanup..."
docker images purge
docker system prune -a
docker system prune --all  --volumes  --force