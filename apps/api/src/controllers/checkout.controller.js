import {
  preCheckoutService,
  checkoutService,
  updatePaymentStatusService,
  getSelectedCartItemsService,
  getOrderService,
  beliSekarangService,
  shippingCostService,
  getOrderCustomerService,
  cancelOrderCustomerService,
  finishOrderCustomerService
} from '../services/checkout.service';

export const getOrderCustomerController = async (req, res) => {
  const { userId } = req.params;
  const { status, paymentStatus, startDate, endDate } = req.body;

  try {
    const result = await getOrderCustomerService(userId, status, paymentStatus, startDate, endDate);
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

export const preCheckoutController = async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await preCheckoutService(userId);
    return res.status(200).json({
      success: true,
      message: 'Get Data for Pre-Checkout Successfully',
      data: result,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const checkoutController = async (req, res) => {
  try {
    const { userId, selectedItems } = req.body;
    const result = await checkoutService(userId, selectedItems);
    return res.status(200).json({
      success: true,
      message: 'Create Order is Successfully',
      data: result,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const beliSekarangController = async (req, res) => {
  try {
    const { userId, productStockId, quantity } = req.body;
    const result = await beliSekarangService(userId, productStockId, quantity);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const uploadPaymentProofController = async (req, res) => {
  try {
    const orderId = req.params.id;
    console.log('orderId: ', orderId);
    const paymentProof = req?.file?.filename;
    console.log(paymentProof);

    if (!paymentProof) {
      throw new Error('No payment proof file provided.');
    }

    const updatedOrder = await updatePaymentStatusService(
      orderId,
      paymentProof,
    );

    return res.status(200).json({ message: 'Payment proof uploaded successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const cancelOrderCustomerController = async (req, res) => {  
  try {
    const {userId, orderId} = req.params;
    await cancelOrderCustomerService(userId, orderId);
    res.status(200).json({ message: 'Order canceled successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const finishOrderCustomerController = async (req, res) => {  
  try {
    const {userId, orderId} = req.params;
    await finishOrderCustomerService(userId, orderId);
    res.status(200).json({ message: 'Finish order successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const shippingCostController = async (req, res) => {
  try {
    // res.status(200).json({message: 'success'});
    const { key, origin, destination, weight, courier } = req.body
    console.log(`${key}, ${origin}, ${destination}, ${weight}, ${courier}`);

    const result = await shippingCostService(key, origin, destination, weight, courier)
    res.status(200).json({
      message: 'Get Shipping cost success',
      data: result
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};