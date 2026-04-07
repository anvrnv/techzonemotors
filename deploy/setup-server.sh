#!/bin/bash
set -e

# Prevent all interactive dialogs during apt operations
export DEBIAN_FRONTEND=noninteractive

# ── 1. System update ──────────────────────────────────────────────────────────
apt-get update && apt-get upgrade -y -o Dpkg::Options::="--force-confkeep"

# ── 2. Node.js 20 install (idempotent) ───────────────────────────────────────
if ! node --version 2>/dev/null | grep -q "^v20"; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi

# ── 3. PM2 install ───────────────────────────────────────────────────────────
npm install -g pm2

# ── 4. Nginx install ─────────────────────────────────────────────────────────
apt-get install -y nginx

# ── 5. Certbot install ───────────────────────────────────────────────────────
apt-get install -y certbot python3-certbot-nginx

# ── 6. UFW firewall ──────────────────────────────────────────────────────────
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

# ── 7. Create /var/www ───────────────────────────────────────────────────────
mkdir -p /var/www

# ── 8. Clone repo (idempotent) ───────────────────────────────────────────────
if [ ! -d /var/www/techzonemotors/.git ]; then
  git clone https://github.com/anvrnv/techzonemotors.git /var/www/techzonemotors
else
  echo "Repo already cloned, skipping."
fi

# ── 9. Create .env.local (idempotent) ────────────────────────────────────────
if [ ! -f /var/www/techzonemotors/.env.local ]; then
  cat > /var/www/techzonemotors/.env.local <<EOF
TELEGRAM_BOT_TOKEN=your_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
EOF
  chmod 600 /var/www/techzonemotors/.env.local
  echo ".env.local created with placeholder values."
else
  echo ".env.local already exists, skipping."
fi

# ── 10. Build app ─────────────────────────────────────────────────────────────
cd /var/www/techzonemotors
npm install --production=false
npm run build

# ── 11. Start with PM2 (idempotent — delete existing before starting) ─────────
cd /var/www/techzonemotors
pm2 delete techzonemotors 2>/dev/null || true
pm2 start ecosystem.config.js

# ── 12. Configure Nginx with HTTP-only config ────────────────────────────────
# deploy/nginx.conf references SSL cert paths that don't exist yet.
# nginx -t would fail and abort the script (set -e).
# Solution: deploy a temporary HTTP-only config first, reload nginx,
# run certbot to obtain certs, then swap in the full SSL config.
cat > /etc/nginx/sites-available/techzonemotors <<'NGINXEOF'
server {
    listen 80;
    server_name techzonemotors.ru www.techzonemotors.ru;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
NGINXEOF
ln -sf /etc/nginx/sites-available/techzonemotors /etc/nginx/sites-enabled/techzonemotors
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx

# ── 13. SSL with Certbot ──────────────────────────────────────────────────────
certbot --nginx \
  -d techzonemotors.ru \
  -d www.techzonemotors.ru \
  --agree-tos \
  --email admin@techzonemotors.ru \
  --non-interactive

# ── 14. Deploy full SSL Nginx config (certs now exist) ───────────────────────
cp /var/www/techzonemotors/deploy/nginx.conf /etc/nginx/sites-available/techzonemotors
nginx -t
systemctl reload nginx

# ── 15. PM2 startup on reboot ────────────────────────────────────────────────
pm2 startup systemd -u root --hp /root | bash
pm2 save

# ── 16. Final success message ────────────────────────────────────────────────
echo ""
echo "=============================================="
echo " Setup complete!"
echo "=============================================="
echo ""
echo "IMPORTANT: Update your environment variables:"
echo "  nano /var/www/techzonemotors/.env.local"
echo ""
echo "Set the following values:"
echo "  TELEGRAM_BOT_TOKEN=<your actual bot token>"
echo "  TELEGRAM_CHAT_ID=<your actual chat ID>"
echo ""
echo "Then restart the app:"
echo "  pm2 restart techzonemotors"
echo ""
echo "Your site should be live at https://techzonemotors.ru"
