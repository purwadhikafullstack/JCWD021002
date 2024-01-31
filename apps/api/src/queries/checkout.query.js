import CartDetail from '../models/cartDetail.model';
import ProductStock from '../models/productStock.model';
import Order from '../models/order.model';
import OrderDetail from '../models/orderDetail.model';
import Product from '../models/product.model';
import ProductImage from '../models/productImage.model';
import Store from '../models/store.model';
import Cart from '../models/cart.model';
import City from '../models/city.model'

export const findPendingOrderQuery = async (userId) => {
  try {
    const pendingOrder = await Order.findOne({
      where: {
        user_iduser: userId,
        status: 'pending',
      },
    });

    return pendingOrder;
  } catch (err) {
    throw err;
  }
};

export const updateOrderTotalAmountQuery = async (orderId, totalAmount) => {
  return await Order.update({ totalAmount }, { where: { id: orderId } });
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
          quantity: cartItem.quantity,
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

export const markCartAsUsedQuery = async (cartId, orderId) => {
  return await Cart.update(
    { status: 'used' },
    { where: { idcart: cartId, order_idorder: orderId } },
  );
};

export const getSelectedCartItemsQuery = async (cartId, selectedItems) => {
  console.log('cartId: ', cartId);
  console.log('selectedItems: ', selectedItems);
  return CartDetail.findAll({
    where: {
      cart_idcart: cartId,
      id: selectedItems,
        // productStock_idproductStock: selectedItems,
    },
    include: [
      {
        model: ProductStock,
        include: [
          { model: Product, include: [ProductImage] },
          { model: Store },
        ],
      },
    ],
  });
};

export const getOrderQuery = async (userId) => {
  return Order.findAll({
    where: {
      user_iduser: userId,
      status: 'pending',
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
) => {
  const t = await Order.sequelize.transaction();

  try {
    const order = await Order.create(
      {
        user_iduser: userId,
        store_idstore: storeId,
        status: 'pending',
        totalAmount,
        orderDate: new Date(),
        paymentMethod: 'credit card',
        codeTransaction: '123ABC',
      },
      { transaction: t },
    );

    for (const cartItem of cartItems) {
      await OrderDetail.create(
        {
          order_idorder: order.id,
          quantity: cartItem.quantity,
          subtotal: cartItem.quantity * cartItem.price,
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

export const clearCartQuery = async (cartId, selectedItems) => {
  const t = await CartDetail.sequelize.transaction();

  try {
    await CartDetail.destroy({
      where: {
        cart_idcart: cartId,
        productStock_idproductStock: selectedItems,
      },
      transaction: t,
    });

    await t.commit();
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

export const findOrderQuery = async (orderId) => {
  try {
    const order = await Order.findByPk(orderId);

    return order;
  } catch (err) {
    throw err;
  }
};

export const updatePaymentStatusQuery = async (orderId, paymentProof) => {
  return await Order.update(
    { image: paymentProof, status: 'complete' },
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
