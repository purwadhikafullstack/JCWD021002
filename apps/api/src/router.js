import { Router } from 'express';
import { sampleRouter } from './routers/sample.router';
import { authRouter } from './routers/auth.router';
import { productRouter } from './routers/product.router';
import { categoryRouter } from './routers/category.router';
import { productStockRouter } from './routers/productStock.router';
import { userRouter } from './routers/user.router';


const router = Router();

router.get('/', (req, res) => {
  res.send(`Hello, Purwadhika Student !`);
});

router.use('/sample', sampleRouter);
router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/products', productRouter);
router.use('/category', categoryRouter);
router.use('/product-stock', productStockRouter);

// add another router here ...

export default router;
