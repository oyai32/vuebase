'use strict'
let HOST = process.argv.splice(2)[0] || 'prod';
module.exports = {
  NODE_ENV: '"production"',
  HOST: '"' + HOST + '"'
}
