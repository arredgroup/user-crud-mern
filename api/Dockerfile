FROM node:14

WORKDIR /install
COPY package.json .
RUN npm install
ENV NODE_PATH=/install/node_modules

WORKDIR /api
COPY . .
CMD npm start
