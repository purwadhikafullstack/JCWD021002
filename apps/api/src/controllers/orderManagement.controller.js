import { acceptOrderService, cancelOrderService, getAllOrderService, mutateStockService, sendUserOrderService } from "../services/orderManagement.service";

export const getAllOrderController = async (req, res) => {
    const storeId  = req.query.storeId || null;

    try {
      const result = await getAllOrderService(storeId);
      return res.status(200).json({
        success: true,
        message: 'Get All Order Successfully',
        data: result,
      });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({
        message: err.message,
      });
    }
}

export const sendUserOrderController = async (req, res) => {
  try {
    const { orderId } = req.params;
    console.log('jalan', orderId);
    const result = await sendUserOrderService(orderId);
    return res.status(200).json({
      success: true,
      message: 'Send User Order Successfully',
      data: result,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      message: err.message,
    });
  }
}

export const acceptOrderController = async (req, res) => {
  try {
    const {adminStoreId, orderId} = req.params;

    const result = await acceptOrderService (adminStoreId, orderId);
    return res.status(200).json({
      success: true,
      message: 'Accept Order by Admin Store',
      data: result,
    })

  } catch (err) {
    return res.status(500).json({
      message: err.message,
    })
  }
}

export const mutateStockController = async (req, res) => {
  try {
    const { productId, storeId, mutationQuantity } = req.body;
      const result = await mutateStockService(productId, storeId, mutationQuantity);
      return res.status(200).json({
        success: true,
        message: 'Mutate Stock By Near Branch Store Successfully',
        data: result,
      });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({
        message: err.message,
      });
    }
};

export const cancelOrderController = async (req, res) => {
  try {
    const { adminStoreId, orderId } = req.params;

    // Call the cancel order service
    const result = await cancelOrderService(adminStoreId, orderId);

    return res.status(200).json({
      success: true,
      message: 'Cancel Order is Successfully',
      data: result,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      message: err.message,
    });
  }
};