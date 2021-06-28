const fs = require("fs");

const login = async (_req_, _res_) => {
  let user = await fs.readFileSync("admin.text");
  if (_req_.body.userID === user) {
    _res_.json({ user: true });
  } else {
    _res_.json({ error: true });
  }
};

module.exports.login = login;
