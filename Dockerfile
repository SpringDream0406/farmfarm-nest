FROM node:22-alpine

# pnpm 설치
RUN npm install -g pnpm

WORKDIR /app

# 종속성 파일만 먼저 복사
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# 소스코드만 복사 (node_modules 제외)
COPY src ./src
COPY nest-cli.json tsconfig*.json ./

# 빌드
RUN pnpm build

CMD ["pnpm", "start:prod"]