import jwt from 'jsonwebtoken'

const authorization = (req, res, next) => {
  const token = req.headers.authorization
  console.log('token : ', token)
  if (!token) {
    return res.sendStatus(403)
  }

  try {
    const verifiedToken = jwt.verify(token, process.env.TOKEN_KEY)
    //TODO:
    req.userId = verifiedToken.userId
    return next()
  } catch (err) {
    return res.sendStatus(403)
  }
}

export { authorization }
