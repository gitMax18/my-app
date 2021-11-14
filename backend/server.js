const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const handleErrorsMiddleware = require("./middlewares/handleErrorMiddleware");
// Routes import
const userRoutes = require("./routes/userRoutes");

require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;

// middlewares
app.use(morgan("dev"));
app.use(express.json());

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

// ErrorsMiddlewares
app.use(handleErrorsMiddleware);

// connection to the server
app.listen(PORT, () => {
  console.log(`server is now listening at : http://localhost:${PORT}`);
});
