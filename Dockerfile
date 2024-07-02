FROM node:20-alpine

RUN npm install -g pnpm@9.1.0

WORKDIR /stage_one

COPY package*.json ./
COPY pnpm-lock.yaml ./

COPY . .

RUN pnpm install

CMD ["node", "server.js"]