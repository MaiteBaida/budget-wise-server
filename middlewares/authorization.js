const jwt = require('jsonwebtoken');
const { JWT_KEY } = process.env;

const authorize = (req, res, next) => {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    try {
      const payload = jwt.verify(token, JWT_KEY);
      req.user = payload;
      next();
    } catch(err) {
      return res.status(401).json("Invalid JWT");
    }
  }

module.exports = { authorize };