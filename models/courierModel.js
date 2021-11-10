import mongoose from "mongoose";

const courierSchema = new mongoose.Schema({
  courier_name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
});

let Dataset =
  mongoose.models.courier || mongoose.model("courier", courierSchema);
export default Dataset;
