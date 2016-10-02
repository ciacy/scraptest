# define base ubuntu image and update it and install curl
FROM oakinogundeji/xenial-node:1.0.0
RUN apt-get update && apt-get install -y python build-essential wget libfreetype6 libfontconfig && \
    wget https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-2.1.1-linux-x86_64.tar.bz2 && \
    tar -jxvf phantomjs-2.1.1-linux-x86_64.tar.bz2 && \
    cd phantomjs-2.1.1-linux-x86_64/ && \
    cp bin/phantomjs /usr/bin/ && \
    cd .. && rm phantomjs-2.1.1-linux-x86_64.tar.bz2 &&  \
    cd ~ && npm install -g casperjs@1.1.3 && \
    rm -rf /var/lib/apt/lists/*
# maintainer
MAINTAINER muyiwa@akinogundeji.com
# copy app into target dir
COPY . /home/node_app
# define directory to run app from
WORKDIR /home/node_app
# npm install
RUN npm install
# expose port and map it to host
EXPOSE 3030
# create new user
RUN useradd node_app -g sudo -m && passwd -d node_app
# set the user for subsequent commands
USER node_app
ENTRYPOINT ["node", "app.js"]
