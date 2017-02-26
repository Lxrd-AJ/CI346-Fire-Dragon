FROM ibmcom/swift-ubuntu:latest
EXPOSE 8080
USER root

RUN apt-get update
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get -y install nodejs

RUN cd /root
COPY . /root

#WORKDIR /root/Clients/Web
#RUN npm install -g npm@latest
#RUN npm install gulp -g
#RUN npm install gulp
#RUN npm install
#RUN gulp build-prod

#WORKDIR /root
#RUN cd /root
RUN swift build --configuration release

CMD ./.build/release/Application env=prod
