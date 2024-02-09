import { Router } from 'express';
import {
  checkoutController,
  getOrderController,
  getSelectedCartItemsController,
  preCheckoutController,
  uploadPaymentProofController,
  shippingCostController,
  addTotalShippingController
} from '../controllers/checkout.controller';
import { uploadPaymentFile } from '../middlewares/multerConfig';
import { verifyToken } from '../middlewares/auth';

export const checkoutRouter = Router();

// GET
checkoutRouter.get('/get-order/:userId', async (req, res) => {
  await getOrderController(req, res);
});

checkoutRouter.get('/pre-checkout/:userId', async (req, res) => {
  await preCheckoutController(req, res);
});

//POST
checkoutRouter.post('/', async (req, res) => {
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
  '/upload-payment-proof/:id',
  uploadPaymentFile,
  async (req, res) => {
    await uploadPaymentProofController(req, res);
  },
);

checkoutRouter.patch(
  '/add-total-shipping-cost',
  verifyToken,
  async (req, res) => {
    await addTotalShippingController(req, res);
  },
);
