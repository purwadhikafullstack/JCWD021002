import { Router } from 'express';
<<<<<<< Updated upstream
import { paymentGatewayController } from '../controllers/payment.controller';
=======
import { afterPaymentController, paymentGatewayController, updateOrderController } from '../controllers/payment.controller';
>>>>>>> Stashed changes

export const paymentRouter = Router();

//POST
paymentRouter.post('/', async (req, res) => {
  await paymentGatewayController(req, res);
});
<<<<<<< Updated upstream
=======

//GET
paymentRouter.patch('/status/:orderId', async (req, res) => {
  await updateOrderController(req, res);
});
>>>>>>> Stashed changes
