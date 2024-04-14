FROM node:21.6.2

WORKDIR /src

# add `/app/node_modules/.bin` to $PATH
ENV PATH /src/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . ./

EXPOSE 4000

CMD ["npm", "run", "dev"]