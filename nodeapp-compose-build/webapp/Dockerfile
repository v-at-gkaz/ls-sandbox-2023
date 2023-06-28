FROM ubuntu:20.04
MAINTAINER Vladimir <v@gkaz.ru>

ENV DEBIAN_FRONTEND noninteractive
ENV TZ Europe/Moscow

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN apt-get update && apt-get install -q -y nodejs npm wget
RUN npm install -g n && n lts
COPY webapp /opt/webapp
COPY entrypoint.sh /opt/entrypoint.sh
RUN chmod +x /opt/entrypoint.sh
ENTRYPOINT ["/opt/entrypoint.sh"]
