const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail({ to, subject, html }) {
    return resend.emails.send({
        from: process.env.FROM_EMAIL,
        to,
        subject,
        html
    });
}

module.exports = sendEmail;
