FROM ibmcom/swift-ubuntu:latest

EXPOSE 80 27017 8090
USER root

RUN apt-get update
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get -y install nodejs


RUN cd /root
COPY . /root

#Build the Web Client 
WORKDIR /root/Public/Fire
RUN npm install -g npm@latest
RUN npm install
RUN ng build -prod

#Build the server side
WORKDIR /root
RUN cd /root
RUN npm install
RUN npm install pm2 -g
CMD ["pm2-docker","server.js"]

