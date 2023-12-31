const {
    addProductStockQuery,
    editStockQuery,
    findOneStockQuery,
} = require( '../queries/productStock.query')

const {
    addJournalQuery,
} = require('../queries/journal.query')

    const addProductStockService = async (stockProduct, productId, storeId, adminId) => {
        try {

            const result = await addProductStockQuery(stockProduct, productId, storeId)
            const res1 = await addJournalQuery(storeId, stockProduct, 0, stockProduct, adminId, result.id)
            return result
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    // const editStockService = async (stockProduct, productStockId, adminId) => {
    //     try {
    //         const res = await findOneStockQuery(productStockId);
    //         const result = await editStockQuery(stockProduct, productStockId)
    //         const res1 = await addJournalQuery(res.store_idstore,
    //              stockProduct > res.stock ? stockProduct - res.stock : res.stock - stockProduct , 
    //              res.stock, stockProduct, adminId, productStockId)
    //         return result
    //     } catch (err) {
    //         throw err;
    //     }
    // }

    const editStockService = async (stockProduct, productStockId, adminId) => {
        try {
            // Fetch the existing stock information
            const existingStock = await findOneStockQuery(productStockId);
    
            // Update the stock in the database
            const updatedStock = await editStockQuery(stockProduct, productStockId);
    
            // Calculate the quantity change for the journal entry
            const quantityChange = stockProduct - existingStock.stock;
    
            // Add a journal entry for the stock change
            await addJournalQuery(
                existingStock.store_idstore,
                Math.abs(quantityChange),
                existingStock.stock,
                stockProduct,
                adminId,
                productStockId
            );
    
            return updatedStock; // Return the result of updating the stock
        } catch (err) {
            console.log(err);
            throw err;
        }
    };
    

    module.exports = {
        addProductStockService,
        editStockService,
    }