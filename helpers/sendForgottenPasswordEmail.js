const { sendEmail } = require('./sendEmail')

const sendForgottenPasswordEmail = async (emailAddress, forgottenPassword) => {
  const { FRONTEND_URL } = process.env
  return await sendEmail({
    to: emailAddress,
    subject: 'Book reader password recovery',
    html: `<h2>Password recovery</h2>
    <p>Your password: <b>${forgottenPassword}<b><p>
    <p>Go to <a href="${FRONTEND_URL}/login" target="_blank">login page</a><p>`,
  })
}

module.exports = { sendForgottenPasswordEmail }
