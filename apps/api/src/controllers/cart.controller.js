import { createCartService } from '../services/cart.service';

export const createCartController = async (req, res) => {
  try {
    const { userId, cartDetails } = req.body;
    console.log(userId, cartDetails);
    const result = await createCartService({ userId, cartDetails });
    // const test = req.body;
    // console.log(`Data: ${test}`)
    // const result = await (test);
    return res.status(200).json({
      success: true,
      message: 'Add Product to Cart Successfully',
      data: result,
    });
    // console.log("success")
  } catch (err) {
    console.log('error');
    return res.status(500).json({
      message: err.message,
    });
  }
  // console.log('Successfully create new cart');
};
