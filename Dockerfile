FROM node:14-alpine
WORKDIR /usr/app
COPY . .
RUN apk --no-cache add curl
RUN npm i
CMD [ "npm", "start" ]