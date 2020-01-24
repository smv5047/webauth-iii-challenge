const express = require("express")

//Import Routers
const port = process.env.PORT || 4030

const authRouter = require("./auth/auth-router")
const usersRouter = require("./users/users-router")


const server = express()


server.use(express.json())

server.use("/api", authRouter)
server.use("/api/users", usersRouter)


server.use((err, req, res, next) =>{
    res.status(500).json({message: "Danger Will Robinson"})
})
server.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
})