const { Op, col } = require('sequelize');
import ProductStock from '../models/productStock.model';
import Store from '../models/store.model';
import City from '../models/city.model';

    const addProductStockQuery = async (stockProduct,productId, storeId) => {
        try {
            const result = await ProductStock.create({
                stock: stockProduct,
                product_idproduct: productId,
                store_idstore: storeId,
                status: 1,
            })

            return result;
        } catch (err) {
            throw err;
        }
    }

    const editStockQuery = async (stockProduct, productStockId, status) => {
        try {
            const result = await ProductStock.update({
                stock: stockProduct,
                status: status,
            }, {
                where: {id: productStockId}
            })

            return result;
        } catch (err) {
            throw err;
        }
    }

    const findOneStockQuery = async (stockId) => {
        try {
            const result = await ProductStock.findOne({
                where: {id: stockId}
            })
    
            return result;
        } catch (err) {
            throw err;
        }
    }

    const findAlreadyStockQuery = async (productId, storeId) => {
        try {
            const result = await ProductStock.findOne({
                where: {
                    product_idproduct : productId,
                    store_idstore : storeId,
                }
            })

            return result;
        } catch (err) {
            throw err;
        }
    }


    module.exports = {
        addProductStockQuery,
        editStockQuery,
        findOneStockQuery,
        findAlreadyStockQuery,
    }