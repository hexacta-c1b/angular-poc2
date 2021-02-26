# ./Dockerfile

FROM node:12-alpine as node-angular-cli

LABEL authors="lbroeders"

# Linux setup
# I got this from another, deprecated Angular CLI image.
# I trust that developer, so I continued to use this, but you
# can leave it out if you want.
RUN apk update \
  && apk add --update alpine-sdk \
  && apk del alpine-sdk \
  && rm -rf /tmp/* /var/cache/apk/* *.tar.gz ~/.npm \
  && npm cache verify \
  && sed -i -e "s/bin\/ash/bin\/sh/" /etc/passwd

RUN mkdir /project
WORKDIR /project
COPY package.json .
RUN npm install
# Angular CLI
RUN npm install -g @angular/cli@8
COPY . .

RUN npm run build

FROM nginx
COPY --from=node-angular-cli /project/dist /usr/share/nginx/html
EXPOSE 80
