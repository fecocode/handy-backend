const responses = require("../../common/tools/http-responses");

exports.handler = async (event) => {
  console.log(event);
  responses._400({ message: "Not found" });
};
