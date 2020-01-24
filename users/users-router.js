const express = require("express")
const Users = require("./users-model")
const router = express.Router()
const restricted = require("../middleware/restricted")

router.get('/users', restricted(), async (req, res, next) =>{
    try {
        const users = await Users.find()
        res.json(users)

    } catch(err) {
        next(err)
    }

})

module.exports = router