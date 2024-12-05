ARG NODE_VERSION=20.12.2

FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /app

FROM base AS dev
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --no-audit --no-fund \
    npx prisma generate
COPY . .
ENTRYPOINT ["sh", "-c", "npm run start:dev" ]

FROM base AS build
COPY . .
RUN npm ci --include=dev \
    npx prisma generate
RUN npm run build

FROM base AS prod
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
COPY --from=build /app/prisma ./prisma
RUN npm ci --include=dev 
ENTRYPOINT ["sh", "-c", "npm run start:prod"]