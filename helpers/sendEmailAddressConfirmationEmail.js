const { sendEmail } = require('./sendEmail')

const sendEmailAddressConfirmationEmail = async (emailAddress, token) => {
  const { BACKEND_URL } = process.env
  return await sendEmail({
    to: emailAddress,
    subject: 'Book reader user email confirmation',
    html: `<a href="${BACKEND_URL}/api/auth/verify/${token}" target="_blank">Click to confirm your email address</a>`,
  })
}

module.exports = { sendEmailAddressConfirmationEmail }
