import connectDB from "../../../utils/connectDB";
import orders from "../../../models/orderModel";
import auth from "../../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getuserorder(req, res);
      break;
  }
};

const getuserorder = async (req, res) => {
  try {
    const { id } = req.query;
    const order = await orders.findById(id);
    if (!order) return res.status(400).json({ err: "Order tidak ditemukan" });

    res.json({ order });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
