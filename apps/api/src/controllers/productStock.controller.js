const {
    addProductStockService,
    editStockService
} = require('../services/productStock.service')

    const addProductStockController = async (req, res) => {
        try {
            const { stockProduct,productId, storeId, adminId } = req.body;

            const result = await addProductStockService(stockProduct,productId, storeId, adminId);

            res.status(201).json({message: 'Product Stock Added Successfully', data: {result}})
        } catch (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    
    const editStockController = async (req, res) => {
        try {
            const { stockProduct, productStockId, adminId } = req.body;
            console.log("ini di controller", );

            const result = await editStockService(stockProduct, productStockId, adminId);

            res.status(201).json({message: 'Product Stock Updated Successfully'})
        } catch (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    module.exports = {
        addProductStockController,
        editStockController,
    }