import { Router } from 'express';
import { paymentGatewayController } from '../controllers/payment.controller';

export const paymentRouter = Router();

//POST
paymentRouter.post('/', async (req, res) => {
  await paymentGatewayController(req, res);
});
