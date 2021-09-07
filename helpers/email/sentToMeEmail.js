const { isEmail } = require("../emailControl/emailControl")
const sendEmail = require("../librires/sentEmail")

const sentToMeEmail = async (user) =>{
    const success = "Onay Emaili başarıyla gönderildi";
    const unsuccess = "Onay emaili gönderilemedi"
    const { MY_EMAIL } = process.env;
    const emailTemplate=`
    <h3>Kayıt olan kullanıcı bilgileri</h3>  
        <table>
        <thead>
            <tr>
                <th>İsim </th>
                <th>Soyisim </th>
                <th>Kullanıcı adı </th>
                <th>Email </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>${user.name}</td>
                <td>${user.surname}</td>
                <td>${user.nickname}</td>
                <td>${user.email}</td>
            </tr>
        </tbody>
    </table>



`;
    
    try {
        await sendEmail({
            from:process.env.SMTP_USER,
            to:MY_EMAIL,
            subject:"Yeni Kayıt",
            html:emailTemplate
        });
        return true
    } catch (error) {
        return error
    }

}


module.exports={
    sentToMeEmail
}