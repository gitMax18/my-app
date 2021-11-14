const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  pseudo: {
    type: String,
    required: [true, "Veuillez entrer un pseudo"],
    maxLength: [20, "votre pseudo ne peut excéder 20 caractères"],
  },
  email: {
    type: String,
    required: [true, "Veuillez entrer un email"],
    unique: true,
    validate: {
      validator: (value) => {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          value
        );
      },
      message: "Veuillez entrer une adresse email valide",
    },
  },
  password: {
    type: String,
    required: [true, "Veuillez entrer un mot de passe"],
    minLength: [6, "Votre mot de passe doit contenir un minimum de 6 caractères"],
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = UserModel = mongoose.model("User", userSchema);
