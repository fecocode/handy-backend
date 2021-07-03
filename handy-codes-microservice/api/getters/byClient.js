// const responses = require("../../common/tools/http-responses");

exports.handler = async (event) => {
  console.log(event);
  return {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "*",
      "Access-control-Allow-Origin": "*",
    },
    statusCode: 400,
    body: "{ hello: 'hi' }",
  };
};
