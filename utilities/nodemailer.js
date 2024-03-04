const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.MAIL,
    pass: process.env.PASSWORD,
  },
});


const nodemail = {
  approvedmail: (too ) => {
    const mailOptions = {
      from: process.env.MAIL,
      to: too,
      subject:
        "Approval of Company Request for RestoreRadiance Website Access",
      text: ` We are pleased to inform you that your company has succusefully registered. 
            Email: ${too}
           `,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.error("Error sending email:", error);
      }
      console.log("Email sent:", info.response);
    });
  },
  rejectmail: (too , companyname) => {
    const mailOptions = {
      from: process.env.MAIL,
      to: too,
      subject: "Rejection of Company Request to Join RestoreRadiance",
      text: `Dear ,${companyname}
       After careful consideration, we regret to inform you that your company has been rejected. 
       RestoreRadiance Team
        `,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.error("Error sending email:", error);
      }
      console.log("Email sent:", info.response);
    });
  },
};



const mailapprove =(too, companyname, ) => {
      const mailOptions = {
        from: process.env.MAIL,
        to: too,
        subject:"approval",
        text: `Hello registration accepted . 
              Email: ${too}
             `,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.error("Error sending email:", error);
        }
        console.log("Email sent:", info.response);
      });
    }






module.exports = {
    nodemail,
    mailapprove
};