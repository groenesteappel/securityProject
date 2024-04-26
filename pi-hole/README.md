https://github.com/imp/dnsmasq/blob/master/dnsmasq.conf.example

https://www.iana.org/dnssec/files#:~:text=The%20Root%20Key%20Signing%20Key,facilitate%20validation%20of%20DNS%20data.

```
# Specify Quad9 DNS servers as upstream resolvers
server=9.9.9.9
server=149.112.112.112

# Enable DNSSEC validation
dnssec
```
