import {
  preCheckoutService,
  checkoutService,
  updatePaymentStatusService,
  getSelectedCartItemsService,
  getOrderService,
<<<<<<< Updated upstream
=======
  beliSekarangService,
>>>>>>> Stashed changes
} from '../services/checkout.service';

export const getOrderController = async (req, res) => {
    const { userId } = req.params;

    try {
      const result = await getOrderService(userId);
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
  const { userId, selectedItems } = req.body;

  try {
    const result = await preCheckoutService(
      userId,
      selectedItems,
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const checkoutController = async (req, res) => {
  const { userId, selectedItems } = req.body;

  try {
    const { order, cartItems } = await checkoutService(userId, selectedItems);
    res.status(200).json({ order, cartItems });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

<<<<<<< Updated upstream
=======
export const beliSekarangController = async (req, res) => {
  try {
    const { userId, productStockId, quantity } = req.body;
    const result = await beliSekarangService(userId, productStockId, quantity);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

>>>>>>> Stashed changes
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

// Controller to handle order cancellation
export const cancelOrderController = async (req, res) => {
  const orderId = req.params.id;

  try {
    await cancelOrderService(orderId);
    res.status(200).json({ message: 'Order canceled successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
