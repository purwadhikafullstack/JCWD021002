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
import { clearCartQuery, findProductStockQuery } from '../queries/cart.query';
import { getMidtransTransactionStatus } from '../utils/midtrans';
import { updatePaymentStatusService } from './checkout.service';

export const getPaymentCustomerService = async (userId, orderId) => {
    try {
        const order = await findOrderCustomerQuery(userId, orderId);
        if(!order) throw new Error('Order not found');

        return order
    } catch {
        throw new Error('Error getting order');
    }
}

export const paymentGatewayService = async (
  userId,
  orderId,
  totalPrice,
  shippingCost,
  products,
) => {
  try {
    // Fetch the order details
    const order = await findOrderQuery(orderId);
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

export const updateOrderService = async (orderId) => {
  try {
    const order = await findOrderQuery(orderId);
    if (!order) throw new Error(`Order not found by orderId: ${orderId}`);

    const transactionMidtrans = await getMidtransTransactionStatus(orderId);
    console.log('Transaction Midtrans:', transactionMidtrans);

    const vaNumbers = transactionMidtrans?.va_numbers || [];
    const paymentMethod =
      transactionMidtrans?.payment_type === 'bank_transfer'
        ? `${vaNumbers[0]?.bank} virtual`
        : transactionMidtrans?.payment_type;
    const paymentCode = vaNumbers[0]?.va_number;
    const paymentStatus = transactionMidtrans?.transaction_status;

    console.log('Payment Method:', paymentMethod);
    console.log('Payment Code:', paymentCode);
    console.log('Payment Status:', paymentStatus);

    if (paymentStatus === 'settlement') {
    //   await updateOrderStatusQuery(order.id, 'new_order');
      await updatePaymentOrderQuery(
        order.id,
        paymentMethod,
        paymentCode,
        paymentStatus,
      );
    } else if (['pending', 'expire'].includes(paymentStatus)) {
    //   await updateOrderStatusQuery(order.id, paymentStatus);
      await updatePaymentOrderQuery(
        order.id,
        paymentMethod,
        paymentCode,
        paymentStatus,
      );
    } else {
      throw new Error('Error updating payment');
    }

    return 'Update Status Successfully';
  } catch (err) {
    console.error('Error in updateOrderService:', err.message || err);
    throw err;
  }
};
