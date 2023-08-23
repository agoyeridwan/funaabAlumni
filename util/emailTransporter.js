const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
// const mailOptions = {
//   from: "aspiringdevelopers2@gmail.com",
//   to: "agoyeridwan@gmail.com",
//   subject: "Subject",
//   text: "Email content",
// };

// transporter.sendMail(mailOptions, function (error, info) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Email sent: " + info.response);
//   }
// });
class EmailTransporter {
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  constructor(user, url) {
    this.user = user;
    this.name = user.fullname;
    this.email = user.email;
    this.url = url;
  }
  async send(subject, content) {
    const mailOption = {
      from: "aspiringdevelopers2@gmail.com",
      to: this.email,
      subject: subject,
      text: content,
    };
    try {
      await this.transporter.sendMail(mailOption, function (_, info) {
        console.log("Email sent: " + info.response);
      });
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
  sendLoginSuccess() {
    this.send(
      "Login Success",
      "You have successfully logged into your account on funaabAlumni"
    );
  }
  sendSignupSuccess() {
    this.send("Signup success", "You have successfully signed up");
  }
  sendSignupPending() {
    this.send();
  }
  sendPasswordReset() {
    this.send("Password Reset", "You are requesting to change your password");
  }
  sendPasswordResetSuccess() {
    this.send(
      "Password Reset confirmation",
      "You have successfully changed your password"
    );
    console.log("Password reset success");
  }
}
// console.log(email);
const testUser = {
  name: "Agoye Ridwan Olasunkanmi",
  email: "agoyeridwan@gmail.com",
  url: "fdgsjgjfgjkfegjh",
};
const testEmail = new EmailTransporter(testUser);
testEmail.sendPasswordReset();
