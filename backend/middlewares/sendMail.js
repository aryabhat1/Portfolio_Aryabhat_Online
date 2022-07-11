import { createTransport } from "nodemailer"

export const sendMail = async (text) => {
    const transporter = createTransport({
        // host: "smtp.mailtrap.io",
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        // port: 2525,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,

            // user: "cc2e9cebe5e5d4",
            // pass: "004183f5554574",
        },
    })

    await transporter.sendMail({ subject: "test mail", to: process.env.DESTINATION_MAIL, from: process.env.MYMAIL, text})
}
