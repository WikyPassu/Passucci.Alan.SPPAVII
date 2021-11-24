const {model, Schema} = require("mongoose");

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    }
});

userSchema.set("toJSON", {
    transform: (document, userToJSON) => {
        userToJSON.id = userToJSON._id.toString();
        delete userToJSON._id;
        delete userToJSON.passwordHash;
        delete userToJSON.__v;
    }
});

module.exports = model("User", userSchema);