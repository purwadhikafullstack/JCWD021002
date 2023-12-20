import Cart from '../models/cart.model';
import CartDetail from '../models/cartDetail.model';
import ProductStock from '../models/productStock.model';
import Product from '../models/product.model';

export const findCartQuery = async (userId) => {
  return Cart.findOne({
    where: { user_iduser: userId },
  });
};

export const createCartQuery = async (userId) => {
  const t = await Cart.sequelize.transaction();

  try {
    const cart = await Cart.create(
      {
        user_iduser: userId,
        totalQuantity: 0,
        addedAt: new Date(),
        totalPrice: 0,
      },
      { transaction: t },
    );

    await t.commit();
    return cart;
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

export const getProductStockQuery = async (productStockId) => {
  return ProductStock.findOne({
    where: { product_idproduct: productStockId },
    include: [Product],
  });
};

export const findCartDetailQuery = async (cartId, productStockId) => {
  return CartDetail.findOne({
    where: {
      productStock_idproductStock: productStockId,
      cart_idcart: cartId,
    },
  });
};

export const createCartDetailQuery = async (cart, item, productStockId) => {
  const { quantity } = item;
  const productPrice = productStockId.Product.price;
  const t = await CartDetail.sequelize.transaction();

  try {
    const cartDetail = await CartDetail.create(
      {
        productStock_idproductStock: item.productStockId,
        quantity,
        price: productPrice,
        cart_idcart: cart.id,
      },
      { transaction: t },
    );

    await t.commit();
    return cartDetail;
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

export const updateItemCartQtyQuery = async (cart, productId, newQuantity) => {
  console.log(
    `cartId: ${cart.id}, productStockId: ${productId}, quantity: ${newQuantity}`,
  );

  const result = await CartDetail.update(
    {
      quantity: newQuantity,
    },
    {
      where: {
        productStock_idproductStock: productId,
        cart_idcart: cart.id,
      },
    },
  );

  return result;
};

export const updateCartTotalsQuery = async (cart) => {
  const t = await Cart.sequelize.transaction();

  try {
    const updateCartDetails = await CartDetail.findAll({
      where: { cart_idcart: cart.id },
      attributes: ['quantity', 'price'],
      transaction: t,
    });

    const totalQuantity = updateCartDetails.reduce(
      (total, detail) => total + detail.quantity,
      0,
    );

    const totalPrice = updateCartDetails.reduce(
      (total, detail) => total + detail.quantity * detail.price,
      0,
    );

    await cart.update(
      {
        totalQuantity,
        totalPrice,
      },
      { transaction: t },
    );

    await t.commit();
  } catch (err) {
    await t.rollback();
    console.error(err.message);
    throw err;
  }
};
