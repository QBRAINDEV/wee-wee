const fs = require("fs");
const admin = require(`./admin.json`);
const login = async (_req_, _res_) => {
  let login = admin.login;
  login = admin.login;
  if (_req_.body.userID === login) {
    _res_.json({ user: true });
  } else {
    _res_.json({ error: true });
  }
};

module.exports.login = login;
