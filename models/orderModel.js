import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
      trim: true,
    },
    cart: {
      type: Array,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    payment: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

let Dataset = mongoose.models.order || mongoose.model("order", orderSchema);
export default Dataset;
