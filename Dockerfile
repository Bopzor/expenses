FROM node:latest

RUN mkdir /opt/app

WORKDIR /opt/app

ENV NODE_ENV=production

COPY package.json /opt/app/package.json
RUN yarn

COPY . /opt/app

RUN yarn build

CMD ["npm", "run", "prod"]