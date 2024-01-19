FROM node:latest
RUN mkdir -p /var/www
WORKDIR /var/www
RUN npm install -g nodemon
COPY ./app/package.json /var/www
RUN npm install
COPY ./app /var/www
EXPOSE 3000
CMD ["node", "app.js"]
