const {
    addProductStockService,
    editStockService
} = require('../services/productStock.service')

    const addProductStockController = async (req, res) => {
        try {
            const { id } = req.user;
            const { stockProduct,productId, storeId, adminId } = req.body;

            const result = await addProductStockService(stockProduct,productId, storeId, id);

            res.status(201).json({message: 'Product Stock Added Successfully', data: {result}})
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    
    const editStockController = async (req, res) => {
        try {
            const { stockProduct, productStockId, status } = req.body;
            const { id } = req.user;

            const result = await editStockService(stockProduct, productStockId, id, status);

            res.status(201).json({message: 'Product Stock Updated Successfully'})
        } catch (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    module.exports = {
        addProductStockController,
        editStockController,
    }