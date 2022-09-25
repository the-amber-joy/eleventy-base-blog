const { DateTime } = require("luxon");
const isDev = require("../_data/isdevelopment")();

// I want scheduled posts to post at midnight in my own timezone
const todaysDate = DateTime.now().setZone("America/Chicago").startOf("day");

function showDraft(data) {
  // let me see ⏳ & ✍️ posts locally
  if (isDev) return true;

  const isFuturePost =
    "scheduled" in data ? data.scheduled > todaysDate : false;

  const isDraft = "draft" in data && data.draft !== false;

  return !isFuturePost && !isDraft;
}

module.exports = () => {
  return {
    eleventyComputed: {
      isFuturePost: (data) =>
        "scheduled" in data ? data.scheduled > todaysDate : false,
      eleventyExcludeFromCollections: (data) =>
        showDraft(data) ? data.eleventyExcludeFromCollections : true,
      permalink: (data) => (showDraft(data) ? data.permalink : false),
    },
    tags: ["posts"],
  };
};
