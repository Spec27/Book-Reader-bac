const queryString = require('query-string')
const axios = require('axios')
const jwt = require('jsonwebtoken')

const { createUser } = require('../../services')
const { User } = require('../../models')

const SECRET_KEY = process.env.SECRET_KEY

exports.googleAuth = async (req, res) => {
  const stringifiedParams = queryString.stringify({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: `${process.env.BACKEND_URL}/api/auth/google-redirect`,
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' '),
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
  })
  return res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`
  )
}

exports.googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`
  const urlObj = new URL(fullUrl)
  const urlParams = queryString.parse(urlObj.search)

  const code = urlParams.code

  const tokenData = await axios({
    url: 'https://oauth2.googleapis.com/token',
    method: 'post',
    data: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.BACKEND_URL}/api/auth/google-redirect`,
      grant_type: 'authorization_code',
      code,
    },
  })

  const userData = await axios({
    url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    method: 'get',
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  })

  console.log(userData)

  const userEmail = userData.data.email
  const userName = userData.data.name

  const existUser = await User.findOne({ email: userEmail })

  if (!existUser) {
    await createUser({
      email: userEmail,
      username: userName,
      verified: true,
      verificationToken: '',
    })
  }

  const currentUser = await User.findOne({ email: userEmail })

  const token = jwt.sign({ id: currentUser.id }, SECRET_KEY, {
    expiresIn: '8h',
  })

  if (currentUser.token !== token) {
    await User.findOneAndUpdate({ _id: currentUser.id }, { token })
  }

  return res.redirect(
    /* `${process.env.FRONTEND_URL}/library?token=${token}&name=${userName}&email=${userEmail}` */
    `${process.env.FRONTEND_URL}/login?token=${token}&name=${userName}&email=${userEmail}`
  )
}
