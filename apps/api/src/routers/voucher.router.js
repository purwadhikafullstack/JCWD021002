import { Router } from 'express';
import { useVoucherController, redeemReferralController } from '../controllers/voucher.controller';
import { verifyToken } from '../middlewares/auth';

const voucherRouter = Router();

// GET
// sampleRouter.get('/', async (req, res) => {
//   const result = await getSampleData();
//   res.json(result);
// });

// POST
voucherRouter.patch('/use-voucher', async (req, res) => {
    const result = await useVoucherController(req, res);
    return result
});

voucherRouter.post('/redeem-referral', verifyToken, async (req, res) => {
    const result = await redeemReferralController(req, res);
    return result
});

export { voucherRouter };
