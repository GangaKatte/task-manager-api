function  authMiddleware (req, res, next) {
    const authHeader = req.headers ['authorization'];

    if (! authHeader || authHeader !== 'Bearer mysecrettoken') {
           return res.status( 401 ).json( { message: 'Unauthorized' });
      }
    
      next();
    }
    
module.exports = authMiddleware;
    

  