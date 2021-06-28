"use strict";

const fs = require("fs");

let ids;
const add = async () => {
  ids = await fs.readFileSync("videos-ids.json");
  return JSON.parse(ids);
};
module.exports.ids = add;
