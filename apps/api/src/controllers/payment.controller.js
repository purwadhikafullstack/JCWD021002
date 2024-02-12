import { afterPaymentService, getPaymentCustomerService, paymentGatewayService, updateOrderService } from "../services/payment.service";

export const getPaymentCustomerController = async (req, res) => {
  try {
    const {userId, orderId} = req.params;
    const result = await getPaymentCustomerService(userId, orderId);
    return res.status(200).json({
      success: true,
      message: 'Get Order Successfully',
      data: result,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      message: err.message,
    });
  }
}

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

export const updateOrderController = async (req, res) => {
  try {
    const {orderId} = req.params;
    const result = await updateOrderService(orderId)
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