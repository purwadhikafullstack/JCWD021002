const {
    addDiscountService,
     getPaginatedAndFilteredDiscountService,
     updateDiscountService,
     getDetailDiscountService,
     getPaginatedAndFilteredVoucherService,
     getFilterDiscountService,
} = require('../services/discount.service')

        const getFilterDiscountController = async (req, res) => {
            try {
                const result = await getFilterDiscountService();
                return res.status(200).json(result);
            } catch (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
            }
        }

        const getPaginatedAndFilteredDiscountController = async (req, res) => {
            try {
            const page = req.query.page || 1;
            const pageSize = parseInt(req.query.pageSize) || null;
            const sortField = req.query.sortField || 'name';
            const sortOrder = req.query.sortOrder || 'asc';
            const typeId = req.query.typeId || null;
            const discountName = req.query.discountName || null;
            const usageRestrictionId = req.query.usageRestrictionId || null;
            const productName = req.query.productName || null;
            const storeId = req.query.storeId || null;
            const status = req.query.status || null;
            const distributionId = req.query.distributionId || null;

            const result = await getPaginatedAndFilteredDiscountService(
                page,
                pageSize,
                sortField,
                sortOrder,
                discountName,
                typeId,
                usageRestrictionId,
                productName,
                status,
                storeId,
                distributionId
                    );
        
        
            return res.status(200).json(result);
            } catch (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
            }
        };

        const getPaginatedAndFilteredVoucherController = async (req, res) => {
            try {
            const page = req.query.page || 1;
            const pageSize = parseInt(req.query.pageSize) || null;
            const sortField = req.query.sortField || 'name';
            const sortOrder = req.query.sortOrder || 'asc';
            const typeId = req.query.typeId || null;
            const discountName = req.query.discountName || null;
            const usageRestrictionId = req.query.usageRestrictionId || null;
            const productName = req.query.productName || null;
            const status = req.query.status || null;
            const storeId = req.query.storeId || null;
            const productStockId = req.query.productStockId || null;

            const result = await getPaginatedAndFilteredVoucherService(
                page,
                pageSize,
                sortField,
                sortOrder,
                discountName,
                typeId,
                usageRestrictionId,
                productName,
                status,
                storeId,
                productStockId
                    );
        
        
            return res.status(200).json(result);
            } catch (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
            }
        };

        const getDetailDiscountController = async (req, res) => {
            try {
                const { id } = req.params;

                const result = await getDetailDiscountService(id);

            return res.status(200).json(result);
            } catch (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
            }
        }

    const addDiscountController = async (req, res) => {
        try {
            const { 
                type,
                discountValue,
                minimumPurchase,
                startDate,
                endDate,
                productStock_idproductStock,
                buy_quantity,
                get_quantity,
                discountAmount,
                usageRestrictionId,
                name,
                description,
                referralCode,
                discountNom,
                distributionId,
             } = req.body;

             const result = await addDiscountService(
                type,
                discountValue,
                minimumPurchase,
                startDate,
                endDate,
                productStock_idproductStock,
                buy_quantity,
                get_quantity,
                discountAmount,
                usageRestrictionId,
                name,
                description,
                referralCode,
                req.file?.filename,
                discountNom,
                distributionId,
             );

            return res.status(201).json(result);
        } catch (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    const updatedDiscountController = async (req, res) => {
        try {
            const { 
                id,
                type,
                discountValue,
                minimumPurchase,
                startDate,
                endDate,
                productStock_idproductStock,
                buy_quantity,
                get_quantity,
                discountAmount,
                usageRestrictionId,
                referralCode,
                discountNom,
                distributionId,
                name,
                description,
                status,
             } = req.body;


             const result = await updateDiscountService(
                 id,
                type,
                discountValue,
                minimumPurchase,
                startDate,
                endDate,
                productStock_idproductStock,
                buy_quantity,
                get_quantity,
                discountAmount,
                usageRestrictionId,
                referralCode,
                req.file?.filename,
                discountNom,
                distributionId,
                name,
                description,
                status,
             );

            return res.status(201).json(result);
        } catch (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    module.exports = {
        addDiscountController,
        getPaginatedAndFilteredDiscountController,
        updatedDiscountController,
        getDetailDiscountController,
        getPaginatedAndFilteredVoucherController,
        getFilterDiscountController,
    }