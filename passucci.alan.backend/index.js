const {PORT} = require("./utils/config");
require("./db/mongo");

const express = require("express");
const cors = require("cors");
const app = express();

const {handlerNotFound, handlerError, logger} = require("./utils/middleware");
const { credencialesRouter } = require("./routes/credencialesRouter");
const { mascotasRouter } = require("./routes/mascotasRouter");
const { tiposRouter } = require("./routes/tiposRouter");

app.use(cors());
app.use(express.json());
app.use(logger);

app.get('/', (req, res) => {
    res.send("<h1>CRUD Mascotas</h1>");
});

app.use("/api/credenciales", credencialesRouter);
app.use("/api/mascotas", mascotasRouter);
app.use("/api/tipos", tiposRouter);

app.use(handlerNotFound);
app.use(handlerError);

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}/`);
});