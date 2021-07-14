FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Installing dependencies
COPY package.json .
RUN yarn

# Copying source files
COPY . .

EXPOSE 3000

# Running the app
CMD ["yarn", "dev"]
