const { isEmail } = require("../emailControl/emailControl")
const sendEmail = require("../librires/sentEmail")

const sentEmailForUser = async (email, subject, emailTemplate) =>{
    const success = "Onay Emaili başarıyla gönderildi";
    const unsuccess = "Onay emaili gönderilemedi"
    try {
        await sendEmail({
            from:process.env.SMTP_USER,
            to:email,
            subject:subject,
            html:emailTemplate
        });
        return true
    } catch (error) {
        return error
    }

}


module.exports={
    sentEmailForUser
}