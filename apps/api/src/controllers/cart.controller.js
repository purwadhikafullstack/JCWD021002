import {
  createCartService,
  updateCartItemQtyService,
  deleteCartItemService,
  getCartService,
} from '../services/cart.service';

export const createCartController = async (req, res) => {
  try {
    const { id } = req.user;
    const { cartDetails } = req.body;
    const result = await createCartService(id, cartDetails);
    return res.status(200).json({
      success: true,
      message: 'Add Product to Cart Successfully',
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const updateItemCartQtyController = async (req, res) => {
  try {
    const { id } = req.user;
    const { productId, newQuantity } = req.params;
    const result = await updateCartItemQtyService(
      id,
      productId,
      newQuantity,
    );
    return res.status(200).json({
      success: true,
      message: 'Update Quantity Product to Cart Successfully',
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const deleteCartItemController = async (req, res) => {
  try {
    const { id } = req.user;
    const { productStockId } = req.body;
    console.log(productStockId);
    const result = await deleteCartItemService( id, productStockId );
    return res.status(200).json({
      success: true,
      message: 'Delete Product from Cart Successfully',
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const getCartController = async (req, res) => {
  try {
    // const { userId } = req.body;
    console.log('cek: ', req.user);
    const { id } = req.user;
    const { cityId } = req.params;
    const result = await getCartService(id, cityId);
    return res.status(200).json({
      success: true,
      message: 'Get Cart Successfully',
      data: result,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
