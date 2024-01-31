import { Router } from 'express';
import { sampleRouter } from './routers/sample.router';
import { authRouter } from './routers/auth.router';
import{ productRouter } from './routers/product.router';
import { cartRouter } from './routers/cart.router';
import { cityRouter } from './routers/city.router';
import { categoryRouter } from './routers/category.router';
import { productStockRouter } from './routers/productStock.router';
import { userRouter } from './routers/user.router';
import { addressRouter } from './routers/address.router';
<<<<<<< Updated upstream
import { checkoutRouter } from './routers/checkout.router';
import { paymentRouter } from './routers/payment.router';
=======
<<<<<<< Updated upstream
=======
import { checkoutRouter } from './routers/checkout.router';
import { paymentRouter } from './routers/payment.router';
import { orderManagementRouter } from './routers/orderManagement.router';
>>>>>>> Stashed changes
>>>>>>> Stashed changes

const router = Router();

router.get('/', (req, res) => {
  res.send(`Hello, Purwadhika Student !`);
});

router.use('/sample', sampleRouter);
router.use('/auth', authRouter);
router.use('/city', cityRouter);
router.use('/address', addressRouter);
router.use('/cart', cartRouter);
router.use('/user', userRouter);
router.use('/products', productRouter);
router.use('/category', categoryRouter);
router.use('/product-stock', productStockRouter);
<<<<<<< Updated upstream
router.use('/checkout', checkoutRouter);
router.use('/payment', paymentRouter);
=======
<<<<<<< Updated upstream
=======
router.use('/checkout', checkoutRouter);
router.use('/payment', paymentRouter);
router.use('/order-management', orderManagementRouter);
>>>>>>> Stashed changes
>>>>>>> Stashed changes

// add another router here ...

export default router;
