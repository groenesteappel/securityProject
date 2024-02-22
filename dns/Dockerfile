# Dockerfile
FROM rockylinux:9.3

# Update the package list and install bind
RUN yum -y update && yum -y install bind

# Change ownership and permissions
RUN mkdir -p /run/named && chown named:named /run/named && chmod 755 /run/named
RUN mkdir -p /var/named/dynamic && chown named:named /var/named/dynamic && chmod 755 /var/named/dynamic