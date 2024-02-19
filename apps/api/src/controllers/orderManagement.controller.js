import { acceptOrderService, cancelOrderService, cancelPaymentService, getAllOrderService, getAllStoreService, getOrderbyAdminService, mutateStockService, sendUserOrderService } from "../services/orderManagement.service";

export const getOrderbyAdminController = async (req, res) => {
  try {
      const {id}  = req.user;
      const { storeId, status, paymentStatus } = req.body;
      // const status  = req.query.status || null;
      const result = await getOrderbyAdminService(id, storeId, status, paymentStatus);
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
    const { id } = req.user;
    const { orderId} = req.params;

    const result = await acceptOrderService (id, orderId);
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
    const { id } = req.user;
    const { orderId } = req.params;

    // Call the cancel order service
    const result = await cancelOrderService(id, orderId);

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

export const cancelPaymentController = async (req, res) => {
  try {
    const {id} = req.user;
    const { orderId } = req.params;

    // Call the cancel order service
    const result = await cancelPaymentService(id, orderId);

    return res.status(200).json({
      success: true,
      message: 'Cancel Payment is Successfully',
      data: result,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const getAllStoreController = async (req, res) => {
  try {

    // Call the cancel order service
    const result = await getAllStoreService();

    return res.status(200).json({
      success: true,
      message: 'Get All Store is Successfully',
      data: result,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      message: err.message,
    });
  }
};

