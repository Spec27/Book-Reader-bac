const sgMailService = require('@sendgrid/mail')

const { SENDGRID_API_KEY, SENDGRID_OWNER } = process.env

sgMailService.setApiKey(SENDGRID_API_KEY)

const sendEmail = async (emailOprions) => {
  try {
    await sgMailService.send({ ...emailOprions, from: SENDGRID_OWNER })
    return true
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = { sendEmail }
