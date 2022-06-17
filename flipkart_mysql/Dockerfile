FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN apk add g++ make py3-pip
RUN npm install nodemon
RUN npm install
COPY . .
EXPOSE 5001
RUN chown -R node /usr/src/app
USER node

CMD ["npm", "start"]
