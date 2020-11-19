# pull official base image
FROM node:latest

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./

RUN npm install
# RUN npm install react-scripts@3.4.0 -g 
# need latest react scripts

# add app
COPY . ./

# start app with npm start ofrom inside the container once it is created.
CMD ["npm", "start"]


# npm install concurrently --save"concurrently \"react-scripts start\" \"cd .\\src && node api.js\""