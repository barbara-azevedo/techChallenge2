FROM node:18-alpine

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

ARG MONGO_URI
ARG JWT_SECRET
ARG PORT

ENV MONGO_URI=$MONGO_URI
ENV JWT_SECRET=$JWT_SECRET
ENV PORT=$PORT 

RUN echo "PORT=${PORT}" > .env
RUN echo "MONGO_URI=${MONGO_URI}" > .env
RUN echo "JWT_SECRET=${JWT_SECRET}" > .env

RUN npm i -g pnpm

RUN pnpm build

RUN npm run test:e2e

EXPOSE 3000

CMD ["node", "dist/main"]