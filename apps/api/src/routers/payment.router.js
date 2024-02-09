import { Router } from 'express';
import { afterPaymentController, getPaymentCustomerController, paymentGatewayController, updateOrderController } from '../controllers/payment.controller';

export const paymentRouter = Router();

//GET
paymentRouter.get('/:userId/:orderId', async (req, res) => {
  await getPaymentCustomerController(req, res);
});

//POST
paymentRouter.post('/', async (req, res) => {
  await paymentGatewayController(req, res);
});

//PATCH
paymentRouter.patch('/:orderId', async (req, res) => {
  await updateOrderController(req, res);
});
