FROM node:latest
WORKDIR /RabbitMQ
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm ci
COPY ./app.js ./connection.js ./index.js ./
EXPOSE 5555
CMD ["npm", "start"]