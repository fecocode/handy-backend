const responses = require("../common/tools/http-responses");
const ses = require("../common/clients/ses.client");

exports.handler = async (event) => {
  console.log("event", event);

  const { to, subject, text, toReply } = JSON.parse(event.body);
  const year = new Date().getFullYear();
  const genericTemplate = require("../templates/generic").genericTemplate();
  const htmlMessage = genericTemplate
    .replace(/##DYNAMIC_TEXT##/g, text)
    .replace(/##DYNAMIC_YEAR##/g, year);

  try {
    await ses.sendEmail(to, subject, htmlMessage, toReply);
    return responses._200({
      message: "Email sent!",
    });
  } catch (err) {
    return responses._400({
      message: err,
    });
  }
};
