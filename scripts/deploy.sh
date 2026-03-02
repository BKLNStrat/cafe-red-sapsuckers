#!/bin/bash
# Rebuild and deploy the site. Run this after Sanity content changes.
# Can be triggered manually or via Sanity webhook.
set -e

cd /home/openclaw/clawd/bstrat-monorepo
npm run build
tar czf /tmp/deploy.tar.gz dist/
scp /tmp/deploy.tar.gz root@104.236.69.208:/tmp/
ssh root@104.236.69.208 "cd /var/www/cafe-red-sapsuckers && rm -rf dist && tar xzf /tmp/deploy.tar.gz && systemctl reload nginx"
echo "Deploy complete: $(date)"
