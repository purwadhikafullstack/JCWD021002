import {
  preCheckoutService,
  checkoutService,
  updatePaymentStatusService,
  getSelectedCartItemsService,
  getOrderService,
  beliSekarangService,
  shippingCostService,
  addTotalShippingService,
  getOrderCustomerService,
  cancelOrderCustomerService,
  finishOrderCustomerService
} from '../services/checkout.service';

export const getOrderCustomerController = async (req, res) => {
  const { id } = req.user;
  console.log('cek', id);
  const { status, paymentStatus, startDate, endDate } = req.body;

  try {
    const result = await getOrderCustomerService(id, status, paymentStatus, startDate, endDate);
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
    const { id } = req.user;
    const result = await preCheckoutService(id);
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
    const { id } = req.user;
    const { selectedItems } = req.body;
    const result = await checkoutService(id, selectedItems);
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
    const { id } = req.user;
    const { productStockId, quantity } = req.body;
    const result = await beliSekarangService(userId, productStockId, quantity);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const cancelOrderCustomerController = async (req, res) => {  
  try {
    const {id} = req.user;
    console.log('cekk',id);
    const {orderId} = req.params;
    await cancelOrderCustomerService(id, orderId);
    res.status(200).json({ message: 'Order canceled successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const finishOrderCustomerController = async (req, res) => {  
  try {
    const {id} = req.user;
    const {orderId} = req.params;
    await finishOrderCustomerService(id, orderId);
    res.status(200).json({ message: 'Finish order successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const shippingCostController = async (req, res) => {
  try {
    // res.status(200).json({message: 'success'});
    const { key, origin, destination, weight, courier } = req.body

    const result = await shippingCostService(key, origin, destination, weight, courier)
    res.status(200).json({
      message: 'Get Shipping cost success',
      data: result
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const addTotalShippingController = async (req, res) => {
  try {
    const { shippingCost, orderId } = req.body
    const result = await addTotalShippingService( shippingCost, orderId );
    res.status(200).json({ message: 'Order updated successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
