import { Router } from 'express';
import { acceptOrderController, cancelOrderController, cancelPaymentController, getAllOrderController, getAllStoreController, getOrderbyAdminController, mutateStockController, sendUserOrderController } from '../controllers/orderManagement.controller';
import { verifyToken } from '../middlewares/auth';

export const orderManagementRouter = Router();

// GET
orderManagementRouter.get('/all-store', verifyToken, async (req, res) => {
  await getAllStoreController(req, res);
});

// POST
orderManagementRouter.post('/', verifyToken, async (req, res) => {
  await getOrderbyAdminController(req, res);
});

//PATCH
orderManagementRouter.patch('/send-order/:orderId', verifyToken, async (req, res) => {
  await sendUserOrderController(req, res);
});

orderManagementRouter.patch('/accept/:orderId', verifyToken, async (req, res) => {
  await acceptOrderController(req, res);
});

orderManagementRouter.patch('/cancel-order/:orderId', verifyToken, async (req, res) => {
  await cancelOrderController(req, res);
});

orderManagementRouter.patch('/cancel-payment/:orderId', verifyToken, async (req, res) => {
  await cancelPaymentController(req, res);
});

orderManagementRouter.patch('/mutate-stock', async (req, res) => {
  await mutateStockController(req, res);
});

