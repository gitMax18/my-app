const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

// hash the password before save in the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// method return a boolean for verify the given password with the database hash password
userSchema.methods.verifyPassword = async function (givenPassword) {
  return await bcrypt.compare(givenPassword, this.password);
};

// method return a new token create with JWT, the payload contain the _id of the user
userSchema.methods.createToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: Number(process.env.EXPIRE_TIME) * 24 * 60 * 60 * 60,
  });
};

module.exports = UserModel = mongoose.model("User", userSchema);
