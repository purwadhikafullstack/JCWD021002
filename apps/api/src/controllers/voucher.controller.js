const {
    useVoucherService, redeemReferralService, voucherUserListsService, useShippingVoucherService,
} = require('../services/voucher.service');

const useVoucherController = async (req, res) => {
    try {
        const { order, voucher } = req.body;
        const { id } = req.user;

        const result = await useVoucherService( order, voucher, id );
        return res.status(201).json({message: 'Order updated successfully', data: result})
    } catch (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const useShippingVoucherController = async (req, res) => {
    try {
        const { order, voucher } = req.body;
        const { id } = req.user;
        
        console.log("ini shipping voucher controller", order, voucher);


        const result = await useShippingVoucherService( order, voucher, id, );
        return res.status(201).json({message: 'Order updated successfully', data: result})
    } catch (err) {
        console.log(err);
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

const voucherUserListsController = async (req, res) => {
    try {
        const { id } = req.user;
        const page = req.query.page || 1;
        const pageSize = parseInt(req.query.pageSize) || null;

        const result = await voucherUserListsService(id, page, pageSize);
        return res.status(201).json(result)
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { useVoucherController, redeemReferralController, voucherUserListsController, useShippingVoucherController, }