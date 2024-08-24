// A wrapper to wrap the try catch block so that we don't have to redefine it everytime

module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
