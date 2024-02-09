import { Router } from 'express';
import { acceptOrderController, cancelOrderController, getAllOrderController, getAllStoreController, getOrderbyAdminController, mutateStockController, sendUserOrderController } from '../controllers/orderManagement.controller';

export const orderManagementRouter = Router();

// GET
orderManagementRouter.get('/all-store', async (req, res) => {
  await getAllStoreController(req, res);
});

// POST
orderManagementRouter.post('/:userId', async (req, res) => {
  await getOrderbyAdminController(req, res);
});

//PATCH
orderManagementRouter.patch('/send-order/:orderId', async (req, res) => {
  await sendUserOrderController(req, res);
});

orderManagementRouter.patch('/accept/:adminStoreId/:orderId', async (req, res) => {
  await acceptOrderController(req, res);
});

orderManagementRouter.patch('/cancel-order/:adminStoreId/:orderId', async (req, res) => {
  await cancelOrderController(req, res);
});

orderManagementRouter.patch('/mutate-stock', async (req, res) => {
  await mutateStockController(req, res);
});

