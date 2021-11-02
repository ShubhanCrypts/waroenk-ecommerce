import connectDB from '../../../utils/connectDB';
import Products from '../../../models/productModel';
import auth from '../../../middleware/auth';
import ProductView from '../../../models/productViewTrackerModel';

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      await getProduct(req, res);
      break;
    case 'PUT':
      await updateProduct(req, res);
      break;
    case 'DELETE':
      await deleteProduct(req, res);
      break;
    case 'POST':
      await postViewProduct(req, res);
      break;
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.query;
    const product = await Products.findById(id);
    if (!product)
      return res.status(400).json({ err: 'Produk tidak ditemukan' });

    res.json({ product });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== 'admin')
      return res.status(400).json({ err: 'Authentication is not valid.' });

    const { id } = req.query;
    const { title, price, inStock, description, content, category, images } =
      req.body;

    if (
      !title ||
      !price ||
      !inStock ||
      !description ||
      !content ||
      category === 'all' ||
      images.length === 0
    )
      return res.status(400).json({ err: 'Please add all the fields.' });

    await Products.findOneAndUpdate(
      { _id: id },
      {
        title: title.toLowerCase(),
        price,
        inStock,
        description,
        content,
        category,
        images,
      }
    );

    res.json({ msg: 'Success! Updated a product' });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const result = await auth(req, res);

    if (result.role !== 'admin')
      return res.status(400).json({ err: 'Authentication is not valid.' });

    const { id } = req.query;

    await Products.findByIdAndDelete(id);
    res.json({ msg: 'Deleted a product.' });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const postViewProduct = async (req, res) => {
  try {
    const {
      title,
      price,
      description,
      content,
      images,
      category,
      checked,
      inStock,
      sold,
    } = req.body;

    // const productView = await Users.findOne({ email });
    // if (user)
    //   return res.status(400).json({ err: 'This email already exists.' });

    // const passwordHash = await bcrypt.hash(password, 12);

    const newProductView = new ProductView({
      title,
      price,
      description,
      content,
      images,
      category,
      checked,
      inStock,
      sold,
    });

    await newProductView.save();
    res.json({ msg: 'Register Success!' });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
