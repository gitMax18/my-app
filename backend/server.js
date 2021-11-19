const express = require("express");
const mongoose = require("mongoose");
// Middlewares imports
const morgan = require("morgan");
const handleErrorsMiddleware = require("./middlewares/handleErrorMiddleware");
const cookieParser = require("cookie-parser");
// Routes import
const userRoutes = require("./routes/userRoutes");
const shoppingListRoutes = require("./routes/shoppingListRoutes");

require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// Manage connection to the database
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connexion to mongo-db established"))
  .catch((err) => console.log(err));

mongoose.connection.on("error", (err) => {
  console.log(err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Connection to mongo-db disconnected");
});

// Routes
app.use("/user", userRoutes);
app.use("/shoppingList", shoppingListRoutes);

// ErrorsMiddlewares
app.use(handleErrorsMiddleware);

// connection to the server
app.listen(PORT, () => {
  console.log(`server is now listening at : http://localhost:${PORT}`);
  console.log(`Vous êtes en mode : ${process.env.NODE_ENV}`);
});
