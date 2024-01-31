import { Router } from 'express';
import { sampleRouter } from './routers/sample.router';
import { authRouter } from './routers/auth.router';
import { productRouter } from './routers/product.router';
import { cartRouter } from './routers/cart.router';
import { cityRouter } from './routers/city.router';
import { categoryRouter } from './routers/category.router';
import { productStockRouter } from './routers/productStock.router';
import { userRouter } from './routers/user.router';
import { addressRouter } from './routers/address.router';
import { massRouter } from './routers/mass.router.js';
import { packagingRouter } from './routers/packaging.router';
import { discountRouter } from './routers/discount.router';
import { ratingRouter } from './routers/ratingAndReview.router';
import { reportRouter } from './routers/report.router';
import { storeRouter } from './routers/store.router.js';
import { checkoutRouter } from './routers/checkout.router';
import { paymentRouter } from './routers/payment.router';
import { voucherRouter } from './routers/voucher.router';

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
router.use('/stocks', productStockRouter);
router.use('/mass', massRouter);
router.use('/packaging', packagingRouter);
router.use('/discount', discountRouter);
router.use('/report', reportRouter);
router.use('/rating', ratingRouter);
router.use('/store', storeRouter);
router.use('/product-stock', productStockRouter);
router.use('/checkout', checkoutRouter);
router.use('/payment', paymentRouter);
router.use('/voucher', voucherRouter);

// add another router here ...

export default router;
