import { Router } from 'express';
import { afterPaymentController, paymentGatewayController, updateOrderController } from '../controllers/payment.controller';

export const paymentRouter = Router();

//POST
paymentRouter.post('/', async (req, res) => {
  await paymentGatewayController(req, res);
});

//GET
paymentRouter.patch('/status/:orderId', async (req, res) => {
  await updateOrderController(req, res);
});
