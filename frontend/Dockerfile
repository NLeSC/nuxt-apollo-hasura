######################################
# Build on the docker image itself (slow and big image size ~2GB)
######################################

#FROM node:14
#
#WORKDIR /usr/src/app
#
#COPY package.json ./
#RUN yarn
#
#COPY . .
#EXPOSE 3000
#
#RUN yarn build
#
#CMD [ "yarn", "start" ]

######################################
# Pre-building locally (~23MB image size)
######################################
FROM nginx:1.19-alpine

COPY dist /usr/share/nginx/html/
