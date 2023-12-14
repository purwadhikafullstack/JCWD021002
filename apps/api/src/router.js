import { Router } from 'express';
import { sampleRouter } from './routers/sample.router';
import { authRouter } from './routers/auth.router';
import{ productRouter } from './routers/product.router';

const router = Router();

router.get('/', (req, res) => {
  res.send(`Hello, Purwadhika Student !`);
});

router.use('/sample', sampleRouter);
router.use('/auth', authRouter);
router.use('/products', productRouter);

// add another router here ...

export default router;
