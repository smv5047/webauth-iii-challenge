const jwt = require("jsonwebtoken")
const { jwtSecret } = require("../data/secrets")

module.exports = () => {
    return (req, res, next) => {
      try {
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, jwtSecret);
        req.users = decoded.id;
        next();
      } catch (err) {
        console.log(err, "MW");
        return res.status(401).json({ message: "Invalid" });
      }
    };
  };