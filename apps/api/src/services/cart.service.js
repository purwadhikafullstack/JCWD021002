import {
  findOrCreateCartQuery,
  getProductStockQuery,
  checkProductQuery,
  findOrCreateCartDetailQuery,
  updateCartTotalsQuery,
} from '../queries/cart.query';

export const createCartService = async ({ userId, cartDetails }) => {
  try {
    const cart = await findOrCreateCartQuery(userId);
    const cartDetailsArray = [];

    for (const item of cartDetails) {
      const productStock = await getProductStockQuery(item.productStockId);

      if (!checkProductQuery(productStock)) {
        throw new Error(`Invalid Product for id: ${item.productStockId}`);
      }

      const createdDetail = await findOrCreateCartDetailQuery(
        cart,
        item,
        productStock,
      );

      cartDetailsArray.push(createdDetail);

      updateCartTotalsQuery(cart, item.quantity, productStock.Product.price);
    }

    await cart.save();

    return { cart, cartDetails: cartDetailsArray };
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};
