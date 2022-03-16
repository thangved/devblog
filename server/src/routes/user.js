const express = require("express");
const UserController = require("../app/controllers/UserController");

const route = express.Router();

route.post("/create", UserController.create);
route.post("/login", UserController.login);
route.post("/auth", UserController.auth);
route.get("/profile/:username", UserController.get);
route.get("/profiles", UserController.gets);

module.exports = route;
