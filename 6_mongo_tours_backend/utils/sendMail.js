const nodemailer = require("nodemailer");

const sendMail =  async (options) => {

    // mail sağlayıcısını ayarla
    const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        secure: false,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
        
    })

    // mail içeriğini belirle
    const mailOptions = {
        // gönderen kullanıcının adresi
        from: "'Furkan Ercan' <info@tourify.com>", 
        // gönderilecek kullanıcıların adresleri
        to: options.email,
        //konu
        subject: options.subject,
        //düz yazı
        text: options.text,
        // html gövdesi
        html: options.html
    }


    // oluşturduğum ayarlara sahip maili gönder.
    await transporter.sendMail(mailOptions);
}

module.exports = sendMail;