// PM2 ecosystem config — CommonJS required (PM2 does not support ESM ecosystem files)
module.exports = {
  apps: [
    {
      name: 'techzonemotors',
      script: 'node_modules/.bin/next',
      args: 'start',
      cwd: '/var/www/techzonemotors',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
        PORT: '3000',
      },
    },
  ],
};
