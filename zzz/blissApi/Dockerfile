FROM node:14.17.1

RUN mkdir -p /app

WORKDIR /app

COPY package.json node_modules*  .env* /

COPY package.json /app/package.json
RUN npm install --quiet
COPY . /app

EXPOSE 9229

CMD ["npm","start"]