const { Op, col } = require('sequelize');
import Journal from '../models/journal.model';

    const addJournalQuery = async (storeId, quantity, beforeStock, afterStock, admin_iduser, productStockId) => {
        try {
            const addFor = beforeStock < afterStock ? 1 : 0
            const result = await Journal.create({
                store_idstore: storeId,
                quantity,
                beforeStock,
                afterStock,
                transactionDate: new Date(),
                admin_iduser,
                productStock_idproductStock: productStockId,
                add: addFor,
            })
        } catch (err) {
            throw err;
        }
    }

    module.exports = {
        addJournalQuery,
    }