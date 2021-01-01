// wrapper function for all of our route handlers
const asyncMiddleware = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next))
    .catch(next);
};

module.exports = asyncMiddleware;
