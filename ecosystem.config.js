module.exports = {
  apps: [
    {
      name: 'nodepop',
      script: './bin/www',
    },
    {
      name: 'thumbnailService',
      script: './microservices/thumbnailcreator.js',
    },
  ],
}
