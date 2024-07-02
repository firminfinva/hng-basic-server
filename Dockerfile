FROM node:18-alpine

RUN npm insatll -g pnpm@9.1.0

WORKDIR /src

COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN pnpm insatll

RUN pnpm build

CMD ["node", "src/server.js"]