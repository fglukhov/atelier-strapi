FROM node:14-alpine as base

RUN apk add --no-cache bash git openssh

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm ci

RUN mv .env.production .env \
    && npm run build

ENV NUXT_HOST 0.0.0.0

ENV NUXT_PORT 5000

EXPOSE 5000

CMD ["npm", "run", "start"]
