const nodeMailer=require("nodemailer");

const sendEmail=async(options)=>{
    const transporter=nodeMailer.createTransport({
        host:process.env.smpt_host,
        port:process.env.smpt_port,
        service:process.env.smpt_service,
        auth:{
            user:process.env.smpt_mail,
            pass:process.env.smpt_password,
        },
    });
    const mailOptions={
        from:process.env.smpt_mail,
        to:options.email,
        subject:options.subject,
        text:options.message,
    };

    await transporter.sendMail(mailOptions);

};
module.exports=sendEmail;