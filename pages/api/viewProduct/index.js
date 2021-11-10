import connectDB from "../../../utils/connectDB";
import Products from "../../../models/productModel";
import auth from "../../../middleware/auth";
import ViewProduct from "../../../models/productViewTrackerModel";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await createViewProduct(req, res);
      break;
  }
};

const createViewProduct = async (req, res) => {
  try {
    //   const result = await auth(req, res)
    //   if(result.role !== 'admin') return res.status(400).json({err: 'Authentication is not valid.'})

    const { title, price, description } = req.body;

    const newProduct = new ViewProduct({
      title,
      price,
      description,
    });

    await newProduct.save();

    res.json({ msg: "Produk berhasil di tracking" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
