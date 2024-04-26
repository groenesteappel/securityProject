FROM debian:buster-slim

RUN apt-get update && apt-get install -y wget && \
    wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm64 -O /usr/local/bin/cloudflared && \
    chmod +x /usr/local/bin/cloudflared && \
    apt-get purge -y --auto-remove wget

CMD ["/usr/local/bin/cloudflared", "proxy-dns", "--address", "0.0.0.0", "--port", "5053", "--upstream", "https://dns.quad9.net/dns-query", "--upstream", "https://dns9.quad9.net/dns-query"]
