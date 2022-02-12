// eslint-disable-next-line
require('@babel/register')({
    plugins: [],
});
  
// eslint-disable-next-line
require('@babel/polyfill');

require('./server.js');
