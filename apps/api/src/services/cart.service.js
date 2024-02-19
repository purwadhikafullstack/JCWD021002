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
  getUserCityIdQuery,
  findStoreQuery,
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

      if (productStock.stock < item.quantity) {
        throw new Error(`Insufficient stock for product id: ${item.productStockId}`);
        // return res.status(400).json({ error: `Insufficient stock for product id: ${item.productStockId}`});
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

export const deleteCartItemService = async ( userId, productStockId ) => {
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

export const getCartService = async (userId, cityId) => {
  try {
    const store = await findStoreQuery(cityId);
    if (!store) throw new Error('Store not found');

    const cart = await getAllCartQuery(userId, store.id);

    if (!cart) {
      throw new Error(`Cart item with product id ${productId} not found`);
    }


    return cart;
  } catch (error) {
    throw error;
  }
};
