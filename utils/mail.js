const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = class Email {
  constructor() {
    this.to = process.env.EMAIL_TO;
    this.from = process.env.EMAIL_FROM;
  }

  message(template, subject) {
    return {
      from: this.from,
      to: this.to,
      subject,
      html: template,
    };
  }

  async sendGlobalError(errorName, errorStack) {
    await sgMail.send(
      this.message(
        "Error from Global Error handler",
        `<h3>Error name => ${errorName}</h3><p>Error stack => \n ${errorStack}</p>`
      )
    );
  }
};
