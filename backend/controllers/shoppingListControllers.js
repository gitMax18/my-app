const catchAsyncError = require("../utils/catchAsyncError");
const ShoppingListModel = require("../models/shoppingListModel");
const HandleError = require("../utils/handleError");

// --- POST --- http://base_url/shoppingList/add
exports.createShoppingList = catchAsyncError(async (req, res, next) => {
  const newShoppingList = await ShoppingListModel.create(req.body);

  res.status(201).json({
    success: true,
    newShoppingList,
  });
});

// --- DELETE --- http://base_url/shoppingList/:id
exports.deleteShopingList = catchAsyncError(async (req, res, next) => {
  const shopingList = await ShoppingListModel.findById(req.params.id);

  if (!shopingList) {
    return next(new HandleError("shopingList introuvable...", 404));
  }

  shopingList.remove();

  res.status(200).json({
    success: true,
    deletedShopingList: shopingList,
  });
});

//--- PUT --- http://base_url/shoppingList/:id
exports.updateShoppingList = catchAsyncError(async (req, res, next) => {
  const updatedShoppingList = await ShoppingListModel.findByIdAndUpdate(
    req.params.id,
    { title: req.body.title },
    {
      runValidators: true,
      new: true,
    }
  );

  res.status(200).json({
    success: true,
    updatedShoppingList,
  });
});

// // --- GET --- http://base_url/shoppingList/:id
// exports.getShoppingList = catchAsyncError(async (req, res, next) => {
//   const shoppingList = await ShoppingListModel.findById(req.params.id);

//   if (!shoppingList) {
//     return next(new HandleError("Liste de course introuvable...", 404));
//   }

//   res.status(200).json({
//     success: true,
//     shoppingList,
//   });
// });

// --- GET --- http://base_url/shoppingList
exports.getAllShoppingList = catchAsyncError(async (req, res, next) => {
  const allShoppingList = await ShoppingListModel.find();

  if (!allShoppingList.length) {
    return next(new HandleError("Aucune liste de course", 404));
  }

  res.status(200).json({
    success: true,
    allShoppingList,
  });
});

// --- PUT --- http://base_url/shoppingList/:id/item/add
exports.addItemToShoppingList = catchAsyncError(async (req, res, next) => {
  if (!req.body.item?.title?.length) {
    return next(new HandleError("Veuillez entrer votre item...", 400));
  }

  const shoppingListWithAddedItem = await ShoppingListModel.findByIdAndUpdate(
    req.params.id,
    {
      $push: { items: req.body.item },
    },
    {
      runValidators: true,
      new: true,
    }
  );

  res.status(200).json({
    success: true,
    shoppingListWithAddedItem,
  });
});

// --- PUT --- http://base_url/shoppingList/:id/item/delete/:itemId
exports.deleteItemToShoppingList = catchAsyncError(async (req, res, next) => {
  const shoppingListWithDeletedItem = await ShoppingListModel.findByIdAndUpdate(
    req.params.id,
    {
      $pull: { items: { _id: req.params.itemId } },
    },
    {
      runValidators: true,
      new: true,
    }
  );

  res.status(200).json({
    success: true,
    shoppingListWithDeletedItem,
  });
});

// --- GET --- http://base_url/shoppingList/:creatorId
exports.getAllShoppingListByCreator = catchAsyncError(async (req, res, next) => {
  const allShoppingListByCreator = await ShoppingListModel.find({
    creator: req.params.creatorId,
  });

  if (!allShoppingListByCreator.length) {
    return next(
      new HandleError("Aucune liste de course de trouver pour cet utilisateur", 404)
    );
  }

  res.status(200).json({
    success: true,
    allShoppingListByCreator,
  });
});
