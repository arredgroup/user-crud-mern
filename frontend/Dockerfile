FROM node:16.3.0-alpine
RUN mkdir -p /app/config /app/src
WORKDIR /app
RUN mkdir -p /app/node_modules
COPY ./package.json ./
RUN apk --no-cache --virtual build-dependencies add \
    python3 \
    make \
    g++ \
    && npm install \
    && apk del build-dependencies


COPY ./ ./
RUN npm install
CMD ["npm", "start"]