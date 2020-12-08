FROM node

# install simple http server for serving static content
RUN npm install -g http-server

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
# COPY package*.json ./

# install project dependencies
# RUN npm install
# RUN yarn install

# copy project files and folders to the current working directory (i.e. 'app' folder)
# COPY . .

# build app for production with minification
# RUN npm run build
# RUN yarn generate
COPY dist /app
EXPOSE 8080
CMD [ "http-server", "dist" ]


# FROM nginx:1.19-alpine
# RUN useradd -G root,www-data -u 1000 ${user}
# COPY dist /usr/share/nginx/html/