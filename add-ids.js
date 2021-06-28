"use strict";

const fs = require("fs");

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

module.exports.add_id = add_id;
