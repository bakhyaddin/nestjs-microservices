FROM node:alpine AS development

WORKDIR /usr/src/app

COPY apps/migrations apps/migrations
COPY apps/reservations/src/models/reservation.entity apps/reservations/src/models/reservation.entity
COPY libs libs
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json ./
COPY nest-cli.json ./

RUN npm install -g pnpm
RUN pnpm install -r
RUN pnpm run build migrations

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install --prod

COPY --from=development /usr/src/app/dist ./dist

CMD ["pnpm", "start", "migrations"]
