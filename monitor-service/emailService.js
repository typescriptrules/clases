import nodemailer from "nodemailer"

// Configuración del transport con tu proveedor
export const transporter = nodemailer.createTransport({
    service: "gmail", // puede ser outlook, yahoo, etc.
    auth: {
        user: process.env.EMAIL_USER, // tu correo
        pass: process.env.EMAIL_PASS, // tu contraseña o app password
    },
})

export const sendEmail = async (subject, text) => {
    try {
        await transporter.sendMail({
            from: `"Monitor Logs" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_TO, // destinatario
            subject,
            text,
        })
        console.log(" Correo enviado con éxito")
    } catch (err) {
        console.error(" Error enviando correo:", err)
    }
}
