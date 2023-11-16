FROM node:16

WORKDIR /install
COPY package.json .
RUN npm install
ENV NODE_PATH=/install/node_modules

WORKDIR /api
COPY . .
CMD npm start
