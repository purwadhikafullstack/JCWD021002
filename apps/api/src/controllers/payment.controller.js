import {
  getPaymentCustomerService,
  paymentGatewayService,
  updateOrderService,
} from '../services/payment.service';

export const getPaymentCustomerController = async (req, res) => {
  try {
    const { id } = req.user;
    const { orderId } = req.params;
    const result = await getPaymentCustomerService(id, orderId);
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
};

export const paymentGatewayController = async (req, res) => {
  try {
    const { id } = req.user;
    const { orderId, totalPrice, shippingCost, products } = req.body;
    const result = await paymentGatewayService(
      id,
      orderId,
      totalPrice,
      shippingCost,
      products,
    );
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
};

export const updateOrderController = async (req, res) => {
  try {
    const { id } = req.user;
    const { orderId } = req.params;
    const result = await updateOrderService(id, orderId);
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
};
