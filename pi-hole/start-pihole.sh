#!/bin/bash
set -x
# Update Pi-hole's password
pihole -a -p $WEBPASSWORD

# Fix lighttpd permissions issue
chown www-data:www-data /var/www/html/admin

# Start Pi-hole using the service command
service pihole-FTL start

# Keep the container running
tail -f /dev/null
