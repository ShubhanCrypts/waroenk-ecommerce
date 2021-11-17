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
    const order = await orders.find();
    res.json({
      status: "success",
      result: order.length,
      order,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

