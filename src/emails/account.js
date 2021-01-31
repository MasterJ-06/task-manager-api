const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'noreply@neutrongalaxy.epizy.com',
        subject: 'Thanks for Signing up.',
        text: `Welcome to the app, ${name}.`
    })
}
const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'noreply@neutrongalaxy.epizy.com',
        subject: 'Sorry to see you go',
        text: `Goodbye, ${name}. Thanks for using our app.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}