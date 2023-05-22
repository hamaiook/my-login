FROM node:16.20.0-bullseye-slim
LABEL MAINTAINER "hamaiook <dososokung.gmail.com>"

ADD . /home/web

WORKDIR /home/web

ENV TZ=Asia/Bangkok

RUN apt-get update && apt-get install -y curl

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ >/etc/timezone

RUN yarn install

RUN yarn run build && rm -rf ./.next/cache && curl -sf https://gobinaries.com/tj/node-prune | bash

RUN node-prune node_modules

RUN yarn global add pm2

EXPOSE 5000

CMD pm2-runtime start config/pm2/prod.json
