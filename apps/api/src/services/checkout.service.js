import axios from 'axios';
import { findCartQuery } from '../queries/cart.query';
import {
  createOrderQuery,
  clearCartQuery,
  getSelectedCartItemsQuery,
  cancelOrderQuery,
  getOrderWithDetails,
  findOrderQuery,
  updatePaymentStatusQuery,
  updateCartDetailsQuery,
  findPendingOrderQuery,
  updateOrderDetailsQuery,
  updateOrderTotalAmountQuery,
  getOrderQuery,
  addTotalShippingQuery,
} from '../queries/checkout.query';
import { calculateDiscountPrice } from '../utils/calculateDiscountPrice';

export const getOrderService = async (userId) => {
  try {
    const pendingOrder = await findPendingOrderQuery(userId)
    if (!pendingOrder) throw new Error('Order not found');

    const result = await getOrderQuery(pendingOrder.user_iduser);
    return result;
  } catch (err) {
    throw err;
  }
}

export const preCheckoutService = async (userId, selectedItems) => {
  const cart = await findCartQuery(userId);

  if (!cart) {
    throw new Error('Cart not found for the user');
  }

  const cartItems = await getSelectedCartItemsQuery(cart.id, selectedItems);

  if (!cartItems || cartItems.length === 0) {
    throw new Error('No valid items in the cart for pre-checkout.');
  }

  const totalAmount = cartItems.reduce((total, cartItem) => {
    return total + (cartItem?.price || 0) * cartItem.quantity;
  }, 0);

  console.log('cartItems: ', cartItems);
  return { cartItems, totalAmount };
};

export const checkoutService = async (userId, selectedItems) => {
    // Find the user's cart
    const cart = await findCartQuery(userId);
  
    // If cart doesn't exist, throw an error
    if (!cart) {
      throw new Error('Cart not found for the user.');
    }
  
    // Get cart items corresponding to the selected items
    const selectedCartItem = await getSelectedCartItemsQuery(cart.id, selectedItems);
  
    // Check if there are valid items in the cart for checkout
    if (!selectedCartItem || selectedCartItem.length === 0) {
      throw new Error('No valid items in the cart for checkout.');
    }
    console.log("ini selected cart item", selectedCartItem);
    // Calculate total amount
    let subTotalProduct = selectedCartItem.reduce((total, orderItem) => {
        console.log('orderItem: ', orderItem?.price);
      return total + (calculateDiscountPrice(orderItem?.price, (orderItem?.ProductStock?.Discounts || []), orderItem.quantity)) * orderItem.quantity;
    }, 0);
    console.log('subTotalProduct', subTotalProduct);
    let shippingCost = 5000;
  
    // let totalAmount = subTotalProduct + shippingCost;
  
    // Check if there is an existing pending order for the user
    const pendingOrder = await findPendingOrderQuery(userId);
  
    if (pendingOrder) {
      // If a pending order exists, update the cart details and totalAmount
      await updateOrderDetailsQuery(pendingOrder.id, selectedCartItem);
      await updateOrderTotalAmountQuery(pendingOrder.id, subTotalProduct);
      
      return { order: pendingOrder, selectedCartItem };
    } else {
      // If no pending order exists, create a new order
      const order = await createOrderQuery(
        userId,
        selectedCartItem[0]?.ProductStock.store_idstore,
        // totalAmount,
        subTotalProduct,
        selectedCartItem,
        );
        
        // Mark the cart as used in the order
        // await markCartAsUsedQuery(cart.id, order.id);
  
      return { order };
    }
  };

  export const beliSekarangService = async (userId, productStockId, quantity) => {
    try {
      
    } catch (err) {
      throw err;
    }
  }

export const updatePaymentStatusService = async (orderId, paymentProof) => {
  console.log(orderId, paymentProof);
  const order = await findOrderQuery(orderId);

  if (!order) {
    throw new Error('Order not found.');
  }

  const updatedOrder = await updatePaymentStatusQuery(orderId, paymentProof);

  return updatedOrder;
};

export const cancelOrderService = async (orderId) => {
  const order = await cancelOrderQuery.getOrderWithDetails(orderId);

  if (!order) {
    throw new Error('Order not found.');
  }

  // Validate if the order can be canceled
  if (!order.canCancelOrder()) {
    throw new Error('Order cannot be canceled at this time.');
  }

  // Process the order cancellation
  await cancelOrderQuery.cancelOrder(order);

  return { message: 'Order canceled successfully.' };
};


export const shippingCostService = async (key, origin, destination, weight, courier) => {
  try {

    const headers = {
      'Content-Type': 'application/json',
      'key': key,
    }

    const data = {
      origin,
      destination,
      weight,
      courier,
    };

    const res = await axios.post('https://api.rajaongkir.com/starter/cost', data, {headers})
    return res.data
  } catch (err) {
    throw err
  }
}

export const addTotalShippingService = async (shippingCost, orderId) => {
  try {
    return await addTotalShippingQuery(shippingCost, orderId);
  } catch (err) {
    throw err;
  }
}
