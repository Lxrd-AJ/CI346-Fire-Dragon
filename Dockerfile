FROM node:7.9.0

EXPOSE 80 27017 8090

# RUN apt-get update
# RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
# RUN apt-get -y install nodejs

# RUN cd /root
# COPY . /root
#==
ADD . /www

#Build the Web Client 
WORKDIR /www/Public/Fire
RUN npm install -g npm@latest
RUN npm install
RUN ng build -prod

#Build the server side
WORKDIR /www
RUN cd /www
RUN npm install
RUN npm install pm2 -g
CMD ["pm2-docker","server.js"]

