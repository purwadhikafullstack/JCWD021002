import axios from 'axios';
import { clearCartQuery, findCartQuery } from '../queries/cart.query';
import {
  createOrderQuery,
  getSelectedCartItemsQuery,
  cancelOrderQuery,
  getOrderWithDetails,
  findOrderQuery,
  updatePaymentStatusQuery,
  updateCartDetailsQuery,
  findNewOrderQuery,
  updateOrderDetailsQuery,
  updateOrderTotalAmountQuery,
  getOrderQuery,
  addTotalShippingQuery,
  getOrderCustomerQuery,
  updateOrderStatusQuery,
  checkOrderDiscountShippingQuery,
  findStoreByProductStockIdQuery
} from '../queries/checkout.query';
import {getUserRoleQuery, getDetailUserQuery} from '../queries/user.query';
import { calculateDiscountPrice } from '../utils/calculateDiscountPrice';
import { getOrderDetailsQuery } from '../queries/orderManagement.query';

export const getOrderCustomerService = async (userId, status, paymentStatus, startDate, endDate) => {
  try {
    const user = await getUserRoleQuery(userId);

    if (!user || user?.role_idrole !== 3) {
      throw new Error('Access Denied. The user is not customer.');
    }

    const order = await getOrderCustomerQuery(user?.id, status, paymentStatus, startDate, endDate);
    return order;
  } catch (err) {
    throw err;
  }
};

export const preCheckoutService = async (userId) => {
  try {
    const order = await findNewOrderQuery(userId)
    if (!order) throw new Error('Order not found');

    // const result = await getOrderQuery(order.user_iduser);
    return order;
  } catch (err) {
    throw err;
  }
};

export const checkoutService = async (userId, selectedItems) => {
  try {
    const cart = await findCartQuery(userId);

    if (!cart) {
      throw new Error('Cart not found for the user.');
    }

    const selectedCartItem = await getSelectedCartItemsQuery(
      cart.id,
      selectedItems,
    );

    if (!selectedCartItem || selectedCartItem.length === 0) {
      throw new Error('No valid items in the cart for checkout.');
    }

    let subTotalProduct = selectedCartItem.reduce((total, orderItem) => {
      // return (
      //   total +
      //   calculateDiscountPrice(
      //     orderItem?.price,
      //     orderItem?.ProductStock?.Discounts || [],
      //     orderItem.quantity,
      //   ) *
      //     orderItem.quantity
      // );
      return total + (calculateDiscountPrice(orderItem?.price, (orderItem?.ProductStock?.Discounts || []), orderItem.quantity)) * orderItem.quantity;
    }, 0);

    let shippingCost = 5000;
    let totalAmount = subTotalProduct + shippingCost;

    const newOrder = await findNewOrderQuery(userId);

    if (newOrder) {
      await updateOrderDetailsQuery(newOrder.id, selectedCartItem[0]?.ProductStock.store_idstore, selectedCartItem);
      await updateOrderTotalAmountQuery(newOrder.id, subTotalProduct);

      // // Clear the cart after successful payment and get the updated cart
      // const updatedCart = await clearCartQuery(cart.id, selectedCartItem[0]?.productStock_idproductStock);

      // // Update the total quantity in the cart
      // if (updatedCart) {
      //   selectedCartItem.forEach(item => {
      //     updatedCart.totalQuantity -= item.quantity;
      //   });
      //   await updatedCart.save();
      // }

      return { order: newOrder, selectedCartItem };
    } else {
      const order = await createOrderQuery(
        userId,
        selectedCartItem[0]?.ProductStock.store_idstore,
        subTotalProduct,
        selectedCartItem,
      );

      // // Clear the cart after successful payment and get the updated cart
      // const updatedCart = await clearCartQuery(cart.id, selectedCartItem[0]?.productStock_idproductStock);

      // // Update the total quantity in the cart
      // if (updatedCart) {
      //   selectedCartItem.forEach(item => {
      //     updatedCart.totalQuantity -= item.quantity;
      //   });
      //   await updatedCart.save();
      // }

      return { order };
    }
  } catch (err) {
    throw err;
  }
};

export const cancelOrderCustomerService = async (userId, orderId) => {
 try {
 const user = await getDetailUserQuery(userId);

 if (!user || user.role_idrole !== 3) {
   throw new Error('User not found or does not have the correct role.');
 }

  const order = await findOrderQuery(orderId);
  if (!order) {
    throw new Error('Order not found.');
  }

  if (order.status === 'new_order' && order.paymentStatus === 'settlement') {
    throw new Error(`Cannot cancel order with settled payment.`);
  } else if (order.status === 'new_order' && order.paymentStatus === 'pending') {
    await updateOrderStatusQuery(order.id, 'cancel');
  } else {
    throw new Error('Error cancelling order.');
  }

  return { message: 'Order canceled successfully.' };
 } catch (err) {
  throw err;
 }
};

export const finishOrderCustomerService = async (userId, orderId) => {
  try {
    const user = await getUserRoleQuery(userId);
    const order = await findOrderQuery(orderId);

    if (!user || !order) {
      throw new Error('User or order not found.');
    }

    if (user.role_idrole !== 3) {
      throw new Error('User does not have the Customer role.');
    }

    if (order.status !== 'delivery' || order.paymentStatus !== 'settlement') {
      throw new Error(`User can't finish the order.`);
    }

    await updateOrderStatusQuery(order.id, 'done');

    return { message: 'Order finished successfully.' };
  } catch (err) {
    throw err;
  }
};

export const shippingCostService = async (
  key,
  origin,
  destination,
  weight,
  courier,
) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      key: key,
    };

    const data = {
      origin,
      destination,
      weight,
      courier,
    };

    const res = await axios.post(
      'https://api.rajaongkir.com/starter/cost',
      data,
      { headers },
    );
    return res.data;
  } catch (err) {
    throw err;
  }
}

export const addTotalShippingService = async (shippingCost, orderId) => {
  try {
    const res = await checkOrderDiscountShippingQuery(orderId);
    if(res) {
      const newShipping = (shippingCost - res?.totalShippingDiscount);
      return await addTotalShippingQuery(newShipping, orderId);
    } else { return await addTotalShippingQuery(shippingCost, orderId); }
  } catch (err) {
    throw err;
  }
}
