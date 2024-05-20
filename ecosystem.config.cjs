module.exports = {
  apps: [
    {
      name: 'Picrosser',
      port: '3000',
      exec_mode: 'cluster',
      instances: 'max',
      cwd: '/var/www/picrosser.com/',
      script: './server/index.mjs'
    }
  ]
}
