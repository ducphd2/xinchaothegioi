FROM node:14
# Install Vim, Nano, or other necessary packages
RUN apt-get update && \
    apt-get install -y vim nano  && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 80 443
CMD ["npm", "start"]