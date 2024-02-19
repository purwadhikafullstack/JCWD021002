import { Router } from 'express';
import { afterPaymentController, getPaymentCustomerController, paymentGatewayController, updateOrderController } from '../controllers/payment.controller';
import { verifyToken } from '../middlewares/auth';

export const paymentRouter = Router();

//GET
paymentRouter.get('/:orderId', verifyToken, async (req, res) => {
  await getPaymentCustomerController(req, res);
});
  
//POST
paymentRouter.post('/', verifyToken, async (req, res) => {
  await paymentGatewayController(req, res);
});

//PATCH
paymentRouter.patch('/:orderId', verifyToken, async (req, res) => {
  await updateOrderController(req, res);
});
