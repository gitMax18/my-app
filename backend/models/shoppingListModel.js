const mongoose = require("mongoose");

const shoppingListSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Veuillez entrer un titre pour votre liste de course"],
  },
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
    required: [true, "Veuillez entrer un 'creator ObjectId' pour cette liste de course"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = ShoppingList = mongoose.model("ShoppingList", shoppingListSchema);
