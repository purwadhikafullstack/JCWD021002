import { Router } from 'express';
import {
  checkoutController,
  getOrderController,
  getSelectedCartItemsController,
  preCheckoutController,
  uploadPaymentProofController,
  shippingCostController,
  getOrderCustomerController,
  cancelOrderCustomerController,
  finishOrderCustomerController
} from '../controllers/checkout.controller';
import { uploadPaymentFile } from '../middlewares/multerConfig';

export const checkoutRouter = Router();

// GET

checkoutRouter.get('/pre-checkout/:userId', async (req, res) => {
  await preCheckoutController(req, res);
});

//POST
checkoutRouter.post('/get-order/:userId', async (req, res) => {
  await getOrderCustomerController(req, res);
});

checkoutRouter.post('/', async (req, res) => {
  await checkoutController(req, res);
});

checkoutRouter.post('/shippingCost', async (req, res) => {
  await shippingCostController(req, res);
  // return 'hello'
});

// checkoutRouter.post('/beliSekarang', async (req, res) => {
//   await beliSekarangController(req, res);
// });

// //PATCH
// checkoutRouter.patch(
//   '/upload-payment-proof/:id',
//   uploadPaymentFile,
//   async (req, res) => {
//     await uploadPaymentProofController(req, res);
//   },
// );

checkoutRouter.patch('/cancel-order/:userId/:orderId', async (req, res) => {
    await cancelOrderCustomerController(req, res);
  },
);

checkoutRouter.patch('/finish-order/:userId/:orderId', async (req, res) => {
    await finishOrderCustomerController(req, res);
  },
);