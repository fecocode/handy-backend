const AWS = require("aws-sdk");

const SES = new AWS.SES({ apiVersion: "2010-12-01" });

const sesClient = {
  sendEmail(to, subject, body, toReply) {
    const params = {
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Body: {
          Html: { Data: body },
        },
        Subject: {
          Data: subject,
        },
      },
      Source: "no-reply@handy.ar",
      ReplyToAddresses: [toReply],
    };
    return SES.sendEmail(params).promise();
  },
};

module.exports = sesClient;
