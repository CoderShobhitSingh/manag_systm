const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    pack: {
      type: String,
    },
    batch: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    purchase_rate: {
      type: Number,
    },
    amount: {
      type: Number,
    },
  },
  { timestamps: true }
);

const ItemModel = mongoose.model("Item", ItemSchema);
module.exports = ItemModel;