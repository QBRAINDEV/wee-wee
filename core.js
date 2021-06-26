const express = require(`express`);
const path = require(`path`);
const appRoot = require("app-root-path");
const cors = require(`cors`);
const helmet = require("helmet");
const { add_id } = require(`./add-ids`);
const { ids } = require(`./get-videos-ids`);
const { login } = require(`./login`);
class Core {
  constructor() {
    this.__serve__ = this.__serve__.bind(this);
    this.__resources__ = this.__resources__.bind(this);

    this.__app = express();
    this.__app.use(cors());
    this.__app.enable("trust proxy");
    this.__app.use(express.json());
    this.__app.use(helmet());

    this.__resources__();
  }

  __resources__() {
    try {
      this.__app.post(`/add/video`, (_req_, _res_) => {
        add_id(_req_, _res_);
      });

      this.__app.post(`/login`, (_req_, _res_) => {
        login(_req_, _res_);
      });

      this.__app.get(`/ids`, async (_req_, _res_) => {
        _res_.json(await ids(_req_, _res_));
      });
    } catch (_error_) {
      console.log(_error_);
    }
  }

  __serve__(_port_) {
    try {
      this.__app.listen(_port_, () => {
        console.log(`serving clean-renov-plus-api`);
      });
    } catch (_error_) {
      console.log(_error_);
    }
  }
}

const core = new Core();

core.__serve__(8080);
