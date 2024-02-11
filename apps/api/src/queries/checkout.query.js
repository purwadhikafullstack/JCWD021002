const { Op, Sequelize } = require('sequelize');
import CartDetail from '../models/cartDetail.model';
import ProductStock from '../models/productStock.model';
import Order from '../models/order.model';
import OrderDetail from '../models/orderDetail.model';
import Product from '../models/product.model';
import ProductImage from '../models/productImage.model';
import Store from '../models/store.model';
import Cart from '../models/cart.model';
import Discount from '../models/discount.model';
import DiscountType from '../models/discountType.model';
import DiscountDistribution from '../models/discountDistribution.model';
import { calculateDiscountPrice } from '../utils/calculateDiscountPrice';
import { calculateDiscountBOGO } from '../utils/calculateDiscountBOGO';
import City from '../models/city.model'
import UsageRestriction from '../models/usageRestriction.model';

export const findNewOrderQuery = async (userId) => {
  try {
    const result = await Order.findOne({
      where: {
        user_iduser: userId,
        status: 'new_order',
        paymentStatus: null,
      },
      include: [
        {
          model: OrderDetail,
          include: [
            {
              model: ProductStock,
              include: [
                { model: Product, include: [ProductImage] },
                { model: Discount },
              ],
            },
          ],
        },
        { model: Store, include: [City] },
      ],
    });

    return result;
  } catch (err) {
    throw err;
  }
};

export const updateOrderTotalAmountQuery = async (orderId, totalAmount) => {
  return await Order.update({ totalAmount, totalShipping: 0 }, { where: { id: orderId } });
};

export const updateOrderDetailsQuery = async (orderId, cartItems) => {
  const t = await OrderDetail.sequelize.transaction();

  try {
    await OrderDetail.destroy({
      where: {
        order_idorder: orderId,
      },
      transaction: t,
    });

    //   for (const cartItem of cartItems) {
    //     await OrderDetail.create(
    //       {
    //         cart_idcart: cartItem.cart_idcart,
    //         productStock_idproductStock: cartItem.productStock_idproductStock,
    //         quantity: cartItem.quantity,
    //       },
    //       { transaction: t },
    //     );
    for (const cartItem of cartItems) {
      await OrderDetail.create(
        {
          order_idorder: orderId,
          quantity: (calculateDiscountBOGO(cartItem.quantity, (cartItem.ProductStock.Discounts || []))),
          subtotal: cartItem.quantity * cartItem.price,
          productStock_idproductStock: cartItem.productStock_idproductStock,
        },
        { transaction: t },
      );
    }

    await t.commit();
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

export const getSelectedCartItemsQuery = async (cartId, selectedItems) => {
  return CartDetail.findAll({
    where: {
      cart_idcart: cartId,
      productStock_idproductStock: selectedItems,
      // productStock_idproductStock: selectedItems,
    },
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
  });
};

export const getOrderQuery = async (userId) => {
  return Order.findAll({
    where: {
      user_iduser: userId,
      status: 'new_order',
      paymentStatus: '',
    },
    include: [
      {
        model: OrderDetail,
        include: [
          {
            model: ProductStock,
            include: [
              { model: Product, include: [ProductImage] },
              { model: Store, include: [City] },
              {
                separate: true,
                model: Discount,
                where: {
                  startDate: { [Sequelize.Op.lte]: new Date() }, // Include discounts with start date less than or equal to the current date
                  endDate: { [Sequelize.Op.gte]: new Date() },   // Include discounts with end date greater than or equal to the current date
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
  });
};

export const getOrderCustomerQuery = async (userId, status, paymentStatus, startDate, endDate) => {
  return Order.findAll({
    where: {
      [Op.and]: [
        { user_iduser: userId },
        status ? { status: status } : {},
        paymentStatus ? { paymentStatus: paymentStatus } : {},
        startDate ? { orderDate: { [Op.gte]: new Date(`${startDate}T00:00:00.000Z`) } } : {},
        endDate ? { orderDate: { [Op.lte]: new Date(`${endDate}T23:59:59.999Z`) } } : {},
      ],
    },
    include: [
      {
        model: OrderDetail,
        include: [
          {
            model: ProductStock,
            include: [
              { model: Product, include: [ProductImage] },
              { model: Store, include: [City] },
            ],
          },
        ],
      },
    ],
  });
};



export const createOrderQuery = async (
  userId,
  storeId,
  totalAmount,
  cartItems,
  quantity,
) => {
  const t = await Order.sequelize.transaction();

  try {
    const order = await Order.create(
      {
        user_iduser: userId,
        store_idstore: storeId,
        status: 'new_order',
        totalAmount,
      },
      { transaction: t },
    );

    for (const cartItem of cartItems) {
      await OrderDetail.create(
        {
          order_idorder: order.id,
          quantity: (calculateDiscountBOGO(cartItem.quantity, (cartItem.ProductStock.Discounts || []))),
          subtotal: cartItem.quantity * (calculateDiscountPrice(cartItem.price, (cartItem.ProductStock.Discounts || []))),
          productStock_idproductStock: cartItem.productStock_idproductStock,
        },
        { transaction: t },
      );
    }

    await t.commit();
    return order;
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

export const findOrderCustomerQuery = async (userId, orderId) => {
  try {
    const order = await Order.findOne({
      where: {
        id: orderId,
        user_iduser: userId,
      },
    });

    return order;
  } catch (err) {
    throw err;
  }
}

export const findOrderQuery = async (orderId) => {
  try {
    const order = await Order.findByPk(orderId, {
      include: [{
        model: OrderDetail,
        as: 'OrderDetails',
      }],
    });

    return order;
  } catch (err) {
    throw err;
  }
};

export const updateOrderStatusQuery = async (orderId, status) => {
  return await Order.update(
    { status: status },
    { where: { id: orderId } },
  );
};

export const cancelOrder = async (order) => {
  const t = await CartDetail.sequelize.transaction();

  try {
    for (const cartDetail of order.Cart.CartDetails) {
      await ProductStock.increment(
        { quantity: cartDetail.quantity },
        { where: { id: cartDetail.ProductStock.id } },
        { transaction: t },
      );
    }

    await Order.update(
      { status: 'canceled' },
      { where: { id: order.id }, transaction: t },
    );

    await t.commit();
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

export const addTotalShippingQuery = async (shippingCost, orderId) => {
  try {
    return await Order.update({
      totalShipping: shippingCost
    }, {
      where: {
        id: orderId
      }
    })
  } catch (err) {
    throw err;
  }
}

export const checkOrderDiscountShippingQuery = async (orderId) => {
  try {
    return await Order.findOne({where: {id : orderId}});
  } catch (err) {
    throw err;
  }
}
