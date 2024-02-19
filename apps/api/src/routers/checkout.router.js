import { Router } from 'express';
import {
  checkoutController,
  getOrderController,
  getSelectedCartItemsController,
  preCheckoutController,
  uploadPaymentProofController,
  shippingCostController,
  addTotalShippingController,
  getOrderCustomerController,
  finishOrderCustomerController,
  cancelOrderCustomerController
} from '../controllers/checkout.controller';
import { verifyToken } from '../middlewares/auth';

export const checkoutRouter = Router();

// GET
checkoutRouter.get('/pre-checkout', verifyToken, async (req, res) => {
  await preCheckoutController(req, res);
});

//POST
checkoutRouter.post('/get-order', verifyToken, async (req, res) => {
  await getOrderCustomerController(req, res);
});
checkoutRouter.post('/', verifyToken, async (req, res) => {
  await checkoutController(req, res);
});
checkoutRouter.post('/shippingCost', async (req, res) => {
  await shippingCostController(req, res);
});

checkoutRouter.post('/beliSekarang', async (req, res) => {
  await beliSekarangController(req, res);
});

//PATCH
checkoutRouter.patch(
  '/cancel-order/:orderId', verifyToken, async (req, res) => {
    await cancelOrderCustomerController(req, res);
  },
);

checkoutRouter.patch(
  '/finish-order/:orderId', verifyToken,
  async (req, res) => {
    await finishOrderCustomerController(req, res);
  },
);

checkoutRouter.patch(
  '/add-total-shipping-cost',
  verifyToken,
  async (req, res) => {
    await addTotalShippingController(req, res);
  },
);
