import {
  findCartQuery,
  findCartDetailQuery,
  getProductStockQuery,
  createCartQuery,
  createCartDetailQuery,
  updateItemCartQtyQuery,
  updateCartTotalsQuery,
} from '../queries/cart.query';

export const createCartService = async (userId, cartDetails) => {
  try {
    let cart = await findCartQuery(userId);

    if (!cart) {
      cart = await createCartQuery(userId);
    }

    const cartDetailsArray = [];

    for (const item of cartDetails) {
      const productStock = await getProductStockQuery(item.productStockId);

      if (!productStock) {
        throw new Error(`Invalid Product for id: ${item.productStockId}`);
      }

      const checkCartDetail = await findCartDetailQuery(
        cart.id,
        item.productStockId,
      );

      if (!checkCartDetail) {
        const createdDetail = await createCartDetailQuery(
          cart,
          item,
          productStock,
        );
        cartDetailsArray.push(createdDetail);
      } else {
        await updateItemCartQtyQuery(
          cart,
          item.productStockId,
          checkCartDetail.quantity + item.quantity,
        );
      }
    }

    await updateCartTotalsQuery(cart);

    console.log(`cartId: ${cart.id}, cartDetails: ${cartDetailsArray}`);

    return { cart, cartDetails: cartDetailsArray };
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};
