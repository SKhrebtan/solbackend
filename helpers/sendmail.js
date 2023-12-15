const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv');

dotenv.config({
  path:
    process.env.NODE_ENV === 'production'
      ? './env/production.env'
      : './env/development.env',
});

const { SENDGRID_PASS } = process.env;

sgMail.setApiKey(SENDGRID_PASS ?? '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');

const sendEmail = async (data) => {
  const email = { ...data, from: 'shrebtan@gmail.com' };
  await sgMail.send(email);
  return true;
};

module.exports = sendEmail;
