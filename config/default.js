const path = require('path');

module.exports = {
  publicPath: path.join(__dirname, '../public'),
  buildPath: path.join(__dirname, '../build'),
  server: {
    host: '0.0.0.0',
    port: 3004,
  },
};