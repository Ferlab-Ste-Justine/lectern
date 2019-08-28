FROM node:8

ARG COMMIT=""

# Create app directory
WORKDIR /usr/src/app

COPY . ./
RUN npm ci
RUN npm run build

EXPOSE 3000

ENV COMMIT_SHA=${COMMIT}

COPY . .
CMD ["npm", "start"]
