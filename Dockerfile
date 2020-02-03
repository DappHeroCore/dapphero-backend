FROM node:12

COPY package.json ./
RUN npm install
COPY . .
EXPOSE 5001
CMD ["node", "/dist/server.js"]