FROM node:18.18.2

EXPOSE 3000
ENV NODE_ENV=production
CMD ["npm", "start"]

WORKDIR /app
ADD package.json /app/
RUN npm install
RUN npm install -g nodemon
ADD . /app
