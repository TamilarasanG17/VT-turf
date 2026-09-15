// const { Resend } = require("resend");

// const resend = new Resend(process.env.RESEND_API_KEY);

// async function sendEmail({ to, subject, html }) {
//     return resend.emails.send({
//         from: process.env.FROM_EMAIL,
//         to,
//         subject,
//         html
//     });
// }

// module.exports = sendEmail;

const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail({ to, subject, html }) {
    try {
        console.log("📧 Sending email...");
        console.log("To:", to);
        console.log("From:", process.env.FROM_EMAIL);

        const result = await resend.emails.send({
            from: process.env.FROM_EMAIL,
            to,
            subject,
            html
        });

        console.log("📧 Resend response:", result);

        if (result.error) {
            console.error("❌ RESEND ERROR:", result.error);
            throw new Error(result.error.message);
        }

        console.log("✅ Email accepted by Resend");
        return result.data;

    } catch (error) {
        console.error("❌ EMAIL FAILED:", error);
        throw error;
    }
}

module.exports = sendEmail;
