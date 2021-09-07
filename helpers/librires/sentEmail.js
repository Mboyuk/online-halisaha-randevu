const nodemailer=require("nodemailer");

const sentEmail=async(mailOptions)=>{
    let transsporter=nodemailer.createTransport({
        host:process.env.SMTP_HOST,
        port:process.env.SMTP_PORT,
        auth:{
            user:process.env.SMTP_USER,
            pass:process.env.SMTP_PASS
        }
    });

    let info=await transsporter.sendMail(mailOptions);
    console.log(`message sent : ${info.messageId}`);

   
}
module.exports=sentEmail;