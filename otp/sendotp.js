require('dotenv').config();

const accountSid=process.env.TWILIO_ACCOUNT_SID;
const authId=process.env.TWILIO_AUTH_TOKEN;
const serviceSid=process.env.TWILIO_SERVICE_SID;
const countryCode=process.env.COUNTRYCODE;

const twilio =require('twilio');
const client=twilio(accountSid, authId);

const otpgenerate=async function(phone) {
  console.log(phone);
  console.log(accountSid);
  console.log(authId);


  verification = await client.verify.v2.services(serviceSid)
      .verifications.create({to: `${countryCode}${phone}`, channel: 'sms'})
      .then(res=>console.log(res+ "sended"))
      .catch(err=>console.log(err))
};

module.exports = otpgenerate