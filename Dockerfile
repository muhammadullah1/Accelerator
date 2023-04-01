FROM node:16-slim

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    # Install unoconv and LibreOffice for document to PDF conversion
    unoconv \
    libreoffice-writer \
    libreoffice-draw \
    libreoffice-calc \
    libreoffice-impress \
    # Install Chromium for puppeteer
    chromium \
    && rm -rf /var/lib/apt/lists/*

# Use Debian Chromium package instead of bundled Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV PUPPETEER_EXECUTABLE_PATH /usr/bin/chromium

WORKDIR /app
COPY package*.json ./
RUN npm install \
    && groupadd -r accelerator && useradd -r -g accelerator -G audio,video accelerator \
    && mkdir -p /home/accelerator/Downloads \
    && chown -R accelerator:accelerator /home/accelerator \
    && chown -R accelerator:accelerator /usr/src/app

USER accelerator
COPY . .

ENV DATABASE_TYPE postgres
ENV DATABASE_HOST localhost
ENV DATABASE_PORT 5432
ENV DATABASE_USERNAME postgres
ENV DATABASE_PASSWORD postgrespw
ENV DATABASE_NAME whiteboard_db1
ENV DATABASE_SYNCHRONIZE true
ENV DATABASE_MAX_CONNECTIONS 100

EXPOSE 8080
CMD [ "node", "server.js" ]
