// middleware/logger.js
const logger = (req, res, next) => {
  const time = new Date().toISOString();
  console.log(`${req.method} ${req.originalUrl} at ${time}`);
  next();
};

module.exports = logger;
