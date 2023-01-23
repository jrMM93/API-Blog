import { User } from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

//------------------------------------------------------------- LOGIN
async function login(req, res) {
  try {
    const { email, password } = req.body

    if (!(email && password)) {
      res.status(400).json('Bad Request')
    }

    const user = await User.findUserByEmail(email)

    if (!user) {
      return res.status(400).json({ errorMessage: 'User not found' })
    }

    const verifiedPass = await bcrypt.compare(password, user.password)

    if (user && verifiedPass) {
      const token = jwt.sign({ userId: user.user_id }, process.env.TOKEN_KEY, {
        expiresIn: '6h',
      })
      return res
        .status(200)
        .json({ Message: 'Successfully logged in', token: token })
    } else {
      return res.status(401).json({ errorMessage: 'Invalid Credentials' })
    }
  } catch (err) {
    res.status(400).json({ 'Error 400': err.message })
  }
}

export { login }
