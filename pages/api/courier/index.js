import connectDB from '../../../utils/connectDB';
import Couriers from '../../../models/courierModel';

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      await getCouriers(req, res);
      break;
  }
};

const getCouriers = async (req, res) => {
  try {
    const couriers = await Couriers.find();
    res.json({
      status: 'success',
      result: couriers.length,
      couriers,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
