FROM node:20-bookworm-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci

COPY . .

RUN npx playwright install --with-deps chromium

CMD ["npm", "run", "test:cucumber"]
