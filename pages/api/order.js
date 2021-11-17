import connectDB from "../../utils/connectDB";
import orders from "../../models/orderModel";
import auth from "../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getorder(req, res);
      break;
    case "POST":
      await createorder(req, res);
      break;
  }
};

const createorder = async (req, res) => {
  try {
    //const result = await auth(req, res)
    //if(result.role !== 'admin') return res.status(400).json({err: 'Authentication is not valid.'})

    const { address, cart, total, payment } = req.body;

    if (!address || !total || cart.length === 0)
      return res.status(400).json({ err: "Please add all the fields." });

    //const order = await orders.findOne({order_id})
    //if(order) return res.status(400).json({err: 'This order already exist.'})

    const newOrder = new orders({
      address,
      cart,
      total,
      payment,
    });

    await newOrder.save(function (err, result) {
      if (err) {
        //
      } else {
        return res.json({
          msg: "Success! Created a new order",
          id: result._id,
        });
      }
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const getorder = async (req, res) => {
  try {
    const { id } = req.query;
    const order = await orders.findById(id);
    if (!order) return res.status(400).json({ err: "Order tidak ditemukan" });

    res.json({ order });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
