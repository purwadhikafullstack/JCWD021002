import { Router } from 'express';
import {
  checkoutController,
  getOrderController,
  getSelectedCartItemsController,
  preCheckoutController,
  uploadPaymentProofController,
} from '../controllers/checkout.controller';
import { uploadPaymentFile } from '../middlewares/multerConfig';

export const checkoutRouter = Router();

// GET
checkoutRouter.get('/:userId', async (req, res) => {
  await getOrderController(req, res);
});

checkoutRouter.get('/pre-checkout', async (req, res) => {
  await preCheckoutController(req, res);
});

//POST
checkoutRouter.post('/', async (req, res) => {
  await checkoutController(req, res);
});

//PATCH
checkoutRouter.patch(
  '/upload-payment-proof/:id',
  uploadPaymentFile,
  async (req, res) => {
    await uploadPaymentProofController(req, res);
  },
);