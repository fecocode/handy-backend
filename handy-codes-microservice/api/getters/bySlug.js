const responses = require("../../common/tools/http-responses");
const Dynamo = require("../../common/clients/codes-table.client");

const qrCodesTable = process.env.CODES_TABLE;

exports.handler = async (event) => {
  console.log("event", event);

  if (!event.pathParameters || !event.pathParameters.slug) {
    return responses._400({
      message: "Slug param does not exist in the request",
    });
  }

  let slug = event.pathParameters.slug;

  const codeRequested = await Dynamo.getBySlug(slug, qrCodesTable).catch(
    (err) => {
      console.log("Error in Dynamo GET", err);
      return null;
    }
  );

  if (!codeRequested) {
    return responses._400({ message: "Failed to get code by slug" });
  }

  return responses._200(codeRequested);
};
