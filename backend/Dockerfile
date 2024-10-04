FROM node:latest

WORKDIR .

COPY ./app ./

RUN npm install

COPY ./app .

RUN npm install cors

EXPOSE 5000

CMD ["node", "index.js"]
