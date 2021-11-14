const mongoose = require("mongoose");

const shoppingListSchema = new mongoose.Schema({
  items: [
    {
      title: {
        type: String,
        required: [true, "Veuillez entrer un titre"],
      },
      quantity: {
        type: Number,
        default: 1,
      },
      unit: {
        type: String,
        enum: {
          values: ["cl", "ml", "L", "g", "kg", "u", ""],
          message: "{VALUE} n'est pas accepté",
        },
        default: "",
      },
      addAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  creator: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = ShoppingList = mongoose.model("ShoppingList", shoppingListSchema);
