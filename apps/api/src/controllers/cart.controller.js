import {
  createCartService,
  updateCartItemQtyService,
  deleteCartItemService,
  getCartService,
} from '../services/cart.service';

export const createCartController = async (req, res) => {
  try {
    const { userId, cartDetails } = req.body;
    console.log(userId, cartDetails);
    const result = await createCartService(userId, cartDetails);
    return res.status(200).json({
      success: true,
      message: 'Add Product to Cart Successfully',
      data: result,
    });
  } catch (err) {
    console.log('error');
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const updateItemCartQtyController = async (req, res) => {
  try {
    const { userId, productId, newQuantity } = req.params;
    console.log(userId, productId, newQuantity);
    const result = await updateCartItemQtyService(
      userId,
      productId,
      newQuantity,
    );
    return res.status(200).json({
      success: true,
      message: 'Update Quantity Product to Cart Successfully',
      data: result,
    });
  } catch (err) {
    console.log('error');
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const deleteCartItemController = async (req, res) => {
  try {
    // const { userId, productId } = req.params;
    const { userId } = req.params;
    const { productId } = req.body;
    const result = await deleteCartItemService({ userId, productId });
    return res.status(200).json({
      success: true,
      message: 'Delete Product from Cart Successfully',
      data: result,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const getCartController = async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await getCartService(userId);
    return res.status(200).json({
      success: true,
      message: 'Get Cart Successfully',
      data: result,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      message: err.message,
    });
  }
};
