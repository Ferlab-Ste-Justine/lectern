#!/bin/sh

export VERSION=$(git rev-parse --short "$GITHUB_SHA")
export IMAGE=chusj/lectern:$VERSION

docker build -t $IMAGE .

docker push $IMAGE