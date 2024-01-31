import {
  findCartQuery,
  findCartDetailQuery,
  getProductStockQuery,
  createCartQuery,
  createCartDetailQuery,
  updateItemCartQtyQuery,
  updateCartTotalsQuery,
  deleteCartItemQuery,
  getAllCartQuery,
  findProductStockQuery,
} from '../queries/cart.query';

export const createCartService = async (userId, cartDetails) => {
  try {
    let cart = await findCartQuery(userId);

    if (!cart) {
      cart = await createCartQuery(userId);
    }

    const cartDetailsArray = [];

    for (const item of cartDetails) {
      const productStock = await findProductStockQuery(item.productStockId);

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

export const updateCartItemQtyService = async (
  userId,
  productId,
  newQuantity,
) => {
  try {
    const cart = await findCartQuery(userId);

    const cartDetail = await findCartDetailQuery(cart.id, productId);

    if (!cartDetail) {
      throw new Error(`Cart item with product id ${productId} not found`);
    }

    await updateItemCartQtyQuery(cart, productId, newQuantity);
    await updateCartTotalsQuery(cart);

    return { cart };
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

export const deleteCartItemService = async ({ userId, productStockId }) => {
  try {
    const cart = await findCartQuery(userId);
    const cartDetail = await findCartDetailQuery(cart.id, productStockId);

    if (!cartDetail) {
      throw new Error(`Cart item with product id ${productStockId} not found`);
    }

    await deleteCartItemQuery(cart, productStockId);
    await updateCartTotalsQuery(cart);

    return { cart };
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

export const getCartService = async (userId) => {
  try {
    const cart = await getAllCartQuery(userId);

    if (!cart) {
      throw new Error(`Cart item with product id ${productId} not found`);
    }

    return cart;
  } catch (error) {
    throw error;
  }
};
