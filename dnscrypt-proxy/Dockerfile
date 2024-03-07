# Use Ubuntu as the base image
FROM ubuntu:20.04

# Install necessary dependencies
RUN apt-get update && apt-get install -y curl tar && rm -rf /var/lib/apt/lists/*

# Set the working directory to /dnscrypt-proxy
WORKDIR /dnscrypt-proxy

# Download and extract the DNSCrypt proxy release
RUN curl -fsSL -o dnscrypt-proxy.tar.gz https://github.com/DNSCrypt/dnscrypt-proxy/releases/download/2.1.5/dnscrypt-proxy-linux_arm-2.1.5.tar.gz && \
    tar -xzf dnscrypt-proxy.tar.gz --strip-components=1 && \
    rm dnscrypt-proxy.tar.gz

# Copy the DNSCrypt proxy configuration file into the container
COPY dnscrypt-proxy.toml /dnscrypt-proxy/

# Ensure the configuration file has the correct permissions
RUN chmod 644 dnscrypt-proxy.toml

# Expose DNSCrypt proxy ports
EXPOSE 53/tcp
EXPOSE 53/udp

# Run the DNSCrypt proxy with the configuration file
CMD ["./dnscrypt-proxy","-config","dnscrypt-proxy.toml"]

