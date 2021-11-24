const mascotasRouter = require("express").Router();
const Mascota = require("../models/Mascota");
const { verifyToken } = require("../utils/middleware");

mascotasRouter.use(verifyToken);

mascotasRouter.get("/", (req, res, next) => {
    Mascota.find({})
    .then(mascotas => res.json(mascotas))
    .catch(err => next(err));
});

mascotasRouter.get("/:id", (req, res, next) => {
    const id = req.params.id;
    Mascota.findById(id)
    .then(mascota => mascota?res.json(mascota):res.status(404).end)
    .catch(err => next(err));
});

mascotasRouter.post("/", (req, res, next) => {
    const {nombre, edad, tipo, vacunado, observaciones} = req.body;
    const newMascota = new Mascota({
        nombre, edad, tipo, vacunado, observaciones
    });
    newMascota.save()
    .then(mascota => res.json(mascota))
    .catch(err => next(err));
});

mascotasRouter.delete("/:id", (req, res, next) => {
    const id = req.params.id;
    Mascota.findByIdAndRemove(id)
    .then(result => result?res.status(204).end():res.status(404).end());
});

mascotasRouter.put("/:id", (req, res, next) => {
    const id = req.params.id;
    const {nombre, edad, tipo, vacunado, observaciones} = req.body;
    const infoMascota = {nombre, edad, tipo, vacunado, observaciones};
    Mascota.findByIdAndUpdate(id, infoMascota, {new: true})
    .then(mascota => mascota?res.json(mascota):res.status(400).end())
    .catch(err => next(err));
});

module.exports = { mascotasRouter };