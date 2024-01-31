import { paymentGatewayQuery } from "../queries/payment.query";

export const paymentGatewayService = async (userId, orderId, totalPrice, shippingCost, products) => {
    try {
        const res = await paymentGatewayQuery(userId, orderId, totalPrice, shippingCost, products);
        return res;
    } catch (err) {
        throw err
    }
}