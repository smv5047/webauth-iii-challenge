const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const userModel = require("../users/users-model")
const { jwtSecret } = require("../data/secrets")

const router = express.Router()

router.post("/register", async (req, res, next) => {
    try {
      const user = await userModel.add(req.body);
  
      res.status(201).json(user);
    } catch (err) {
      next();
    }
  });

router.post("/login", async (req, res, next) => {
  const generateToken = (user) => {
    const payload = {
      subject: user.id,
      username: user.username,
      department: user.department
    }
    const options = {
      expiresIn: "1d"
    }
    return jwt.sign(payload, jwtSecret, options)
  }

  try {
    const { username, password } = req.body
    const [user] = await usersModel.findBy({ username })
    const validatePassword = await bcrypt.compare(password, user.password)

    if (user && validatePassword) {
      const token = generateToken(user)
      res.status(200).json({
        message: `It's dangerous to go alone, ${user.username}. Take this token.`,
        token
      })
    } else {
      res.status(401).json({ massage: "You shall not pass!" })
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router