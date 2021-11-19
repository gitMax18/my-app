const route = require("express").Router();
const {
  createShoppingList,
  updateShoppingList,
  deleteShopingList,
  getShoppingList,
  getAllShoppingList,
  addItemToShoppingList,
  deleteItemToShoppingList,
  getAllShoppingListByCreator,
} = require("../controllers/shoppingListControllers");

route.post("/add", createShoppingList);
route.put("/:id/item/add", addItemToShoppingList);
route.put("/:id/item/delete/:itemId", deleteItemToShoppingList);
route.delete("/:id", deleteShopingList);
route.put("/:id", updateShoppingList);
// route.get("/:id", getShoppingList);
route.get("/", getAllShoppingList);
route.get("/:creatorId", getAllShoppingListByCreator);

module.exports = route;
