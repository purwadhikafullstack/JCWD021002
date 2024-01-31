import { paymentGatewayService } from "../services/payment.service";

export const paymentGatewayController = async (req, res) => {
    try {
        const { userId, orderId, totalPrice, shippingCost, products } = req.body
        const result = await paymentGatewayService(userId, orderId, totalPrice, shippingCost, products);
        return res.status(200).json({
            success: true,
            message: 'Get Token Midtrans Successfully',
            data: result,
          });
        } catch (err) {
          console.error(err.message);
          return res.status(500).json({
            message: err.message,
          });
        }
}