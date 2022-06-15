FROM node:16.15.1-alpine3.16

WORKDIR /API_mercado_libre
COPY . .
RUN yarn install --production

CMD ["node", "/API_mercado_libre/src/index.js"]