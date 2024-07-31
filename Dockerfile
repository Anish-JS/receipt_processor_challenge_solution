FROM node:10-alpine
RUN mkdir -p D:/Anish/Imp/fetch_backend_service/node_modules && chown -R node:node D:/Anish/Imp/fetch_backend_service

WORKDIR /home/node/app
COPY package*.json ./
USER node
RUN npm install
COPY --chown=node:node . .
EXPOSE 8080
CMD [ "node", "index.js" ]