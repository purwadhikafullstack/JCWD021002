import { Router } from 'express';
import { useVoucherController, redeemReferralController, voucherUserListsController, useShippingVoucherController } from '../controllers/voucher.controller';
import { verifyToken } from '../middlewares/auth';

const voucherRouter = Router();

// GET
// sampleRouter.get('/', async (req, res) => {
//   const result = await getSampleData();
//   res.json(result);
// });

// POST
voucherRouter.patch('/use-voucher', verifyToken, async (req, res) => {
    const result = await useVoucherController(req, res);
    return result
});

voucherRouter.patch('/use-shipping-voucher', verifyToken, async (req, res) => {
    const result = await useShippingVoucherController(req, res);
    return result
});

voucherRouter.post('/redeem-referral', verifyToken, async (req, res) => {
    const result = await redeemReferralController(req, res);
    return result
});

voucherRouter.get('/voucher-user-lists', verifyToken, async (req, res) => {
    const result = await voucherUserListsController(req, res);
    return result
});

export { voucherRouter };
