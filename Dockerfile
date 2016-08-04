FROM node:onbuild

MAINTAINER Fridolin Koch <frido.koch@tum.de>

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ADD . /usr/src/app

RUN npm install -g typings gulp
RUN npm install
RUN typings install
RUN gulp

CMD ["node", "docker.js"]
