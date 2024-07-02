FROM node:18-alpine

RUN npm install -g pnpm@9.1.0

WORKDIR /src

COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN pnpm install

RUN pnpm start

CMD ["node", "server.js"]