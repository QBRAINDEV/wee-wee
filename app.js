const express = require(`express`);
const cors = require(`cors`);
const { add_id } = require(`./public/add-ids`);
const { ids } = require(`./public/get-videos-ids`);
const { login } = require(`./public/login`);

let app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested, Content-Type, Accept Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "POST, PUT, PATCH, GET, DELETE");
    return res.status(200).json({});
  }
  next();
});

app.options("*", cors());

app.use(express.static("public"));
app.post(`/add/video`, cors(), (_req_, _res_) => {
  add_id(_req_, _res_);
});

app.post(`/login`, cors(), (_req_, _res_) => {
  login(_req_, _res_);
});

app.get(`/ids`, cors(), async (_req_, _res_) => {
  _res_.json(await ids(_req_, _res_));
});

app.use(express.static(__dirname + "/public/css"));
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.listen(3000, () => {
  console.log(`serving wee-wee-server`);
});
