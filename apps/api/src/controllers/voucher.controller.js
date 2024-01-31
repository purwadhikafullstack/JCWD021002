const {
    useVoucherService, redeemReferralService,
} = require('../services/voucher.service');

const useVoucherController = async (req, res) => {
    try {
        const { order, voucher } = req.body;

        const result = await useVoucherService(order, voucher);
        return res.status(201).json({message: 'Order updated successfully', data: result})
    } catch (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const redeemReferralController = async (req, res) => {
    try {
        const { referral } = req.body;
        const { id } = req.user;

        const result = await redeemReferralService(id, referral);
        return res.status(201).json({message: 'Redeem referral successfully', data: result})
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { useVoucherController, redeemReferralController, }