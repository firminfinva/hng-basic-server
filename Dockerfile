FROM node:22-alpine

RUN npm install -g pnpm@9.1.0

WORKDIR /src

COPY package*.json ./
COPY pnpm-lock.yaml ./

COPY . .

RUN pnpm install

CMD ["node", "server.js"]