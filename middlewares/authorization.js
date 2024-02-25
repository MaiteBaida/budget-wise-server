const jwt = require("jsonwebtoken");
const { JWT_KEY } = process.env;

//authorize user
const authorize = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const payload = jwt.verify(authorization, JWT_KEY);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json("Not authorized");
  }
};

module.exports = { authorize };
