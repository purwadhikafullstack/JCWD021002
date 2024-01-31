// services/payment.service.js

import { findOrderQuery, getOrderQuery, updateOrderStatusQuery } from "../queries/checkout.query";
import { getOrderDetailsQuery, updateStockQtyQuery } from "../queries/orderManagement.query";
import { paymentGatewayQuery } from "../queries/payment.query";
import { clearCartQuery, findProductStockQuery } from "../queries/cart.query";
import { getMidtransTransactionStatus } from "../utils/midtrans";

export const paymentGatewayService = async (userId, orderId, totalPrice, shippingCost, products) => {
    try {
        // Fetch the order details
        const order = await findOrderQuery(orderId);
        if (!order) {
            throw new Error('Not found order by orderId: ', orderId);
        }

        // Perform payment gateway operation
        const token = await paymentGatewayQuery(userId, orderId, totalPrice, shippingCost, products);

        return token;
    } catch (err) {
        throw err;
    }
}

export const updateOrderService = async (orderId) => {
    try {
        const order = await findOrderQuery(orderId);

        if (!order) {
            throw new Error(`Order not found by orderId: ${orderId}`);
        }

        if (order.status !== 'pending') {
            throw new Error('Status is not pending');
          }

        // Fetch Midtrans transaction status
        const transactionMidtrans = await getMidtransTransactionStatus(orderId);

        if (transactionMidtrans.transaction_status !== 'settlement') {
            throw new Error('User do not have payment')
        }

        // Update order status to 'Diproses'
        await updateOrderStatusQuery(orderId, 'payment accepted');

        return order;
    } catch (err) {
        console.error('Error in updateOrderService:', err.message || err);
        throw err;
    }
};

