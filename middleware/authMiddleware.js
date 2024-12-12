const authMiddleware = (req, res, next) => {
    if (req.session && req.session.userId) {
      next();
    } else {
      res.status(401).json({ 
        message: 'Unauthorized. Silakan login terlebih dahulu.' 
      });
    }
  };
  
  module.exports = authMiddleware;