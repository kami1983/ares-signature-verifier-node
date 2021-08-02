FROM node:14
WORKDIR /usr/src/app
RUN yarn install
COPY . .
EXPOSE 8080
CMD [ "yarn", "serve" ]
