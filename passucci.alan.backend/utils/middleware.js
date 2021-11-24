const {SECRET} = require("../utils/config");
const jwt = require("jsonwebtoken");

const handlerNotFound = (req, res) => {
    res.status(404).json({error: "No existe esa ruta."});
};

const handlerError = (error, req, res, next) => {
    console.log(error.name + "\n" + error.message);
    if(error.name === "CastError"){
        res.status(400).send({error: "ID Invalido"});
    }
    else if(error.name === "SyntaxError"){
        res.status(400).send({error: "Error de sintaxis"});
    }
    else if(error.name === "ReferenceError"){
        res.status(400).send({error: error.name, message: error.message});
    }
    else if(error.name === "ValidationError"){
        res.status(400).send({error: error.name, message: error.message});
    }
    else if(error.name === "ErrorToken"){
        res.status(401).send({error: error.name, message: error.message});
    }
    else if(error.name === "JsonWebTokenError"){
        res.status(403).send({error: error.name, message: error.message});
    }
    else if(error.name === "TokenExpiredError"){
        res.status(401).send({error: error.name, message: error.message});
    }
    else{
        res.status(500).send({ok: false, error: "Error interno del servidor"});
    }
    next();
};

const logger = ((req, res, next) => {
    console.log(req.path);
    console.log(req.method);
    next();
});

const verifyToken = async (req, res, next) => {
    const bearerToken = req.headers["authorization"];
    if(typeof bearerToken !== "undefined"){
        req.token = bearerToken.split(" ")[1];
        try{
            const data = await jwt.verify(req.token, SECRET);
            console.log(data);
            next(); 
        }catch (error){
            next(error);
        }
    }
    else{
        next({name:"ErrorToken", message:"No Token"});
    }
};

module.exports = {
    handlerNotFound,
    handlerError,
    logger,
    verifyToken
};