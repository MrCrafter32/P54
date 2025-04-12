FROM node:18
WORKDIR /app
COPY . .
RUN npm install express mongodb cors
EXPOSE 5000
CMD ["node", "server.js"]