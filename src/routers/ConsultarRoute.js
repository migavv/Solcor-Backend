const { Router } = require("express");
const route = Router();
const Controller = require("../controllers/ConsultarController");

route.all("/", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

route.post("/", Controller.calculate);
route.get("/", Controller.getAll);

module.exports = route;