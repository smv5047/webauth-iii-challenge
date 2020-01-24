const db = require("../data/db-config")


const findBy = (filter) => {
    return db("users")
      .where(filter)
      .select(["id", "username", "password", "department"])
  }



const findById = (id) => {
    return db("users")
      .where({ id })
      .first("id", "username", "department")
  }

const add = async (user) => {
    user.password = await bcrypt.hash(user.password, 12)
    const [id] = await db("users").insert(user)
    return findById(id)
}

module.exports = {
    add,
    findBy,
    findById
}