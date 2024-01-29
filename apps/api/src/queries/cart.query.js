const { Op, Sequelize } = require('sequelize');
import Cart from '../models/cart.model';
import CartDetail from '../models/cartDetail.model';
import ProductStock from '../models/productStock.model';
import Product from '../models/product.model';
import ProductImage from '../models/productImage.model';
import Store from '../models/store.model';
import Discount from '../models/discount.model';
import DiscountType from '../models/discountType.model';
import DiscountDistribution from '../models/discountDistribution.model';
import UsageRestriction from '../models/usageRestriction.model';

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
    where: { id: productStockId },
    include: [{ model: Product, include: [ProductImage] }, { model: Store }, ],
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

export const deleteCartItemQuery = async (cart, productId) => {
  const t = await CartDetail.sequelize.transaction();

  try {
    await CartDetail.destroy({
      where: {
        productStock_idproductStock: productId,
        cart_idcart: cart.id,
      },
      transaction: t,
    });

    await t.commit();
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

export const getAllCartQuery = async (userId) => {
  return await Cart.findAll({
    where: { user_iduser: userId },
    include: [
      {
        model: CartDetail,
        include: [
          {
            model: ProductStock,
            include: [
              { model: Product, include: [ProductImage] },
              { model: Store },
              {
                separate: true,
                model: Discount,
                where: {
                  startDate: { [Sequelize.Op.lte]: new Date() }, // Include discounts with start date less than or equal to the current date
                  endDate: { [Sequelize.Op.gte]: new Date() },   // Include discounts with end date greater than or equal to the current date
                  // productStock_idproductStock: productStockId, // Additional condition to match productStock_idproductStock with the main query's id
                },
                include: [
                  {
                    model: UsageRestriction,
                  },
                  {
                    model: DiscountType,
                  },
                  {
                    model: DiscountDistribution,
                  },
                  {
                    model: Store,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    order: [
      [CartDetail, 'id', 'ASC'], // Assuming `id` is the field you want to sort by
    ],
  });
};

