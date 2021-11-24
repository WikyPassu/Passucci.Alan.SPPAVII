const {model, Schema} = require("mongoose");

const tipoSchema = new Schema({
    descripcion: {
        type: String,
        required: true
    }
});

tipoSchema.set("toJSON", {
    transform: (document, tipoToJSON) => {
        tipoToJSON.id = tipoToJSON._id.toString();
        delete tipoToJSON._id;
        delete tipoToJSON.__v;
    }
});

module.exports = model("Tipo", tipoSchema);