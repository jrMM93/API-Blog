import { User } from '../models/user.js'
import bcrypt from 'bcrypt'

//------------------------------------------------------------- CREATE
async function createUser(req, res) {
  try {
    const emailIsUnique = await User.findUserByEmail(req.body.email)
    if (emailIsUnique) {
      return res.json('Email already in use')
    }

    const saltRounds = 10
    const salt = bcrypt.genSaltSync(saltRounds)
    const hashPass = await bcrypt.hash(req.body.password, salt)
    const { firstName, lastName, email } = req.body

    await User.createUser(firstName, lastName, email, hashPass)

    return res.status(200).json('Your account has been successfully created')
  } catch (err) {
    res.status(500).json({ 'Error 500': err.message })
  }
}

export { createUser }
