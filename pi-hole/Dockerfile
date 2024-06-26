FROM ubuntu:20.04 as gitdownloader

RUN apt update -y && apt install git curl jq -y

RUN git clone https://github.com/pi-hole/docker-pi-hole.git /docker-pihole

WORKDIR /docker-pihole

RUN git fetch --all --tags

RUN  echo "2023.02.02">/version.txt

RUN git describe --tags `git rev-list --tags --max-count=1`>/version.txt

RUN cat /version.txt

ARG PIHOLE_BASE
FROM ubuntu:20.04

ENV TZ=Europe/Berlin
ENV WEBPASSWORD=changeme

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN apt update -y && apt upgrade -y && apt install php curl -y



ARG PIHOLE_DOCKER_TAG
COPY --from=gitdownloader /version.txt /pihole.docker.tag


ENTRYPOINT [ "/s6-init" ]

 # etc and usr are now in /

COPY --from=gitdownloader /docker-pihole/src/s6/debian-root/ /
# file is in /usr/local/bin/service
RUN ls /usr/local/bin
COPY --from=gitdownloader /docker-pihole/src/s6/service /usr/local/bin/service

WORKDIR /usr/local/bin

RUN bash -ex  /usr/local/bin/install.sh 2>&1 && \
    rm -rf /var/cache/apt/archives /var/lib/apt/lists/*

ARG PHP_ERROR_LOG
ENV PHP_ERROR_LOG /var/log/lighttpd/error-pihole.log

# Add PADD to the container, too.
ADD https://install.padd.sh /usr/local/bin/padd
RUN chmod +x /usr/local/bin/padd

# IPv6 disable flag for networks/devices that do not support it
ENV IPv6 True

EXPOSE 53 53/udp
EXPOSE 67/udp
EXPOSE 80

ENV S6_KEEP_ENV 1
ENV S6_BEHAVIOUR_IF_STAGE2_FAILS 2
ENV S6_CMD_WAIT_FOR_SERVICES_MAXTIME 0

ENV FTLCONF_LOCAL_IPV4 0.0.0.0
ENV VIRTUAL_HOST ""
ENV FTL_CMD no-daemon
ENV DNSMASQ_USER pihole

ENV PATH /opt/pihole:${PATH}

HEALTHCHECK CMD dig +short +norecurse +retry=0 @127.0.0.1 pi.hole || exit 1

SHELL ["/bin/bash", "-c"]