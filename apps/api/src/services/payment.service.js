// services/payment.service.js

import {
  findOrderCustomerQuery,
  findOrderQuery,
  getOrderQuery,
  updateOrderStatusQuery,
} from '../queries/checkout.query';
import {
  getOrderDetailsQuery,
  updateStockQtyQuery,
} from '../queries/orderManagement.query';
import {
  paymentGatewayQuery,
  updatePaymentOrderQuery,
} from '../queries/payment.query';
import {
  clearCartDetailQuery,
  clearCartQuery,
  findCartDetailQuery,
  findCartQuery,
  findProductStockQuery,
  updateCartTotalsQuery,
  updateItemCartQtyQuery,
} from '../queries/cart.query';
import { getMidtransTransactionStatus } from '../utils/midtrans';
import { updatePaymentStatusService } from './checkout.service';

export const getPaymentCustomerService = async (userId, orderId) => {
  try {
    const order = await findOrderCustomerQuery(userId, orderId);
    if (!order) throw new Error('Order not found');

    return order;
  } catch {
    throw new Error('Error getting order');
  }
};

export const paymentGatewayService = async (
  userId,
  orderId,
  totalPrice,
  shippingCost,
  products,
) => {
  try {
    // Fetch the order details
    const order = await findOrderCustomerQuery(userId, orderId);
    if (!order) {
      throw new Error('Not found order by orderId: ', orderId);
    }

    // Perform payment gateway operation
    const token = await paymentGatewayQuery(
      userId,
      orderId,
      totalPrice,
      shippingCost,
      products,
    );

    return token;
  } catch (err) {
    throw err;
  }
};

export const updateOrderService = async (userId, orderId) => {
  try {
    const order = await findOrderCustomerQuery(userId, orderId);
    console.log('cek ', order.OrderDetails);
    if (!order) throw new Error(`Order not found by orderId: ${orderId}`);

    const transactionMidtrans = await getMidtransTransactionStatus(orderId);
    const vaNumbers = transactionMidtrans?.va_numbers || [];
    const paymentMethod =
      transactionMidtrans?.payment_type === 'bank_transfer'
        ? `${vaNumbers[0]?.bank} virtual`
        : transactionMidtrans?.payment_type;
    const paymentCode = vaNumbers[0]?.va_number;
    const paymentStatus = transactionMidtrans?.transaction_status;

    const currentDate = new Date();

    if (
      paymentStatus === 'settlement' ||
      ['pending', 'expire'].includes(paymentStatus)
    ) {
      // Update the payment order
      await updatePaymentOrderQuery(
        order.id,
        paymentMethod,
        paymentCode,
        paymentStatus,
        currentDate,
      );

      const cart = await findCartQuery(userId);

      if (!cart) {
        throw new Error(`Cart not found for userId: ${userId}`);
      }

      const selectedItemOrderDetail = order.OrderDetails.map((detail) => ({
        productStockId: detail.productStock_idproductStock,
      }));

      // Clear the cart details
      await clearCartDetailQuery(
        cart.id,
        selectedItemOrderDetail.map((item) => item.productStockId),
      );

      // Update totalQuantity and totalPrice for the entire cart
      await updateCartTotalsQuery(cart);

      return 'Update Status and Clear Cart Successfully';
    } else {
      throw new Error('Error updating payment');
    }
  } catch (err) {
    console.error('Error in updateOrderService:', err.message || err);
    throw err;
  }
};
