const {
    addProductStockQuery,
    editStockQuery,
    findOneStockQuery,
    findAlreadyStockQuery,
} = require( '../queries/productStock.query')

const {
    addJournalQuery,
} = require('../queries/journal.query')

    const addProductStockService = async (stockProduct, productId, storeId, adminId) => {
        try {
            const res2 = await findAlreadyStockQuery(productId, storeId);

            if(res2?.length == 0) {
            const result = await addProductStockQuery(stockProduct, productId, storeId)
            const res1 = await addJournalQuery(storeId, stockProduct, 0, stockProduct, adminId, result.id)
            return result
            }

            throw new Error("Already in stock")

        } catch (err) {
            throw err;
        }
    }

    const editStockService = async (stockProduct, productStockId, adminId, status) => {
        try {
            // Fetch the existing stock information
            const existingStock = await findOneStockQuery(productStockId);
    
            // Update the stock in the database
            const updatedStock = await editStockQuery(stockProduct, productStockId, status);
    
            // Calculate the quantity change for the journal entry
            const quantityChange = stockProduct - existingStock.stock;
    
            // Add a journal entry for the stock change
            if (stockProduct > 0) {
                await addJournalQuery(
                    existingStock.store_idstore,
                    Math.abs(quantityChange),
                    existingStock.stock,
                    stockProduct,
                    adminId,
                    productStockId
                );
            }
    
            return updatedStock; // Return the result of updating the stock
        } catch (err) {
            throw err;
        }
    };
    

    module.exports = {
        addProductStockService,
        editStockService,
    }