const tiposRouter = require("express").Router();
const Tipo = require("../models/Tipo");

tiposRouter.get("/", (req, res, next) => {
    Tipo.find({})
    .then(tipos => res.json(tipos))
    .catch(err => next(err));
});

module.exports = { tiposRouter };