"use strict";

const fs = require("fs");

const allowCors = (fn) => async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};
const add_id = async (_req_, _res_) => {
  try {
    if (!_req_.body.id || !_req_.body.title) {
      _res_.json({
        error: true
      });
    } else {
      let id = {
        videoID: _req_.body.id,
        title: _req_.body.title
      };

      let ids = fs.readFileSync("videos-ids.json");
      ids = JSON.parse(ids);
      ids.push(id);
      await fs.writeFileSync("videos-ids.json", JSON.stringify(ids));
      _res_.json({
        added: true
      });
    }
  } catch (_error_) {
    console.log(_error_);
  }
};

module.exports.add_id = allowCors(add_id);
