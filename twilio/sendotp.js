require('dotenv').config();


const otpgenerate=async function(phone) {
  const accountSid=process.env.TWILIO_ACCOUNT_SID;
  const authId=process.env.TWILIO_AUTH_TOKEN;
  const serviceSid=process.env.TWILIO_SERVICE_SID;
  const countryCode=process.env.COUNTRYCODE;
  
  const twilio =require('twilio');
  const client=twilio(accountSid, authId);


  verification = await client.verify.v2.services(serviceSid)
      .verifications.create({to: `${countryCode}${phone}`, channel: 'sms'})
      .then(res=>console.log(res+ "sended"))
      .catch(err=>console.log(err))
};


//code to verify otp
const verify = async function (phone, otp) {
  console.log("verify otp",phone,otp);

  try {
    const verificationCheck = await client.verify.v2
      .services(`${serviceSid}`)
      .verificationChecks.create({ to: `+91${phone}`, code: otp });
    console.log(verificationCheck.status);
    return verificationCheck
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  otpgenerate,
  verify
}