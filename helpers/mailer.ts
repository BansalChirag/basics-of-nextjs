import User from "@/models/userModel";

import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

const sendMail = async ({ emailTo, emailType, userId }: any) => {
  try {
    const token = await bcrypt.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: token,
          verifyTokenExpiry: Date.now() + 3600000,
        },
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: token,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        },
      });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: process.env.user,
        pass: process.env.pass
      },
    });

    const mailOptions = {
      from: "chirag1525.be20@chitkara.edu.in",
      to: emailTo,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your Password",
      html:
        emailType === "VERIFY"
          ? `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${token}">here</a> to verify your email
                or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${token}
                </p>`
          : `<p>Click <a href="${process.env.DOMAIN}/reset-password?token=${token}">here</a> to reset your password
                or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/reset-password?token=${token}
                </p>`,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (err: any) {
    console.log("err : " + err);
    throw new Error(err.message);
  }
};

export default sendMail;
