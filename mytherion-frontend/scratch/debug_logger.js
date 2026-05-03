
const logger = require('./app/utils/logger').logger;
console.log('Initial ENV:', process.env.NODE_ENV);
process.env.NODE_ENV = 'development';
console.log('Changed ENV:', process.env.NODE_ENV);
logger.debug('Test debug');
