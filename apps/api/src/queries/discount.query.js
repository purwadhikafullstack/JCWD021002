const { Op, col } = require('sequelize');
import Discount from '../models/discount.model';
import DiscountUsage from '../models/discountUsage.model';

    const addDiscount = async (
        type,
        discountValue,
        minimumPurchase,
        startDate,
        endDate,
        productStock_idproductStock,
        buy_quantity,
        get_quantity,
    ) => {
        try {
            const addedValue = {
                type,
                discountValue,
                minimumPurchase,
                startDate,
                endDate,
                productStock_idproductStock,
                buy_quantity,
                get_quantity,
                status = 'active'
              };
        
              // Remove properties with null values
              Object.keys(addedValue).forEach((key) => {
                if (addedValue[key] == null || addedValue[key] == undefined) {
                  delete addedValue[key];
                }
              });

            const result = Discount.create(addedValue)

            return result;
        } catch (err) {
            throw err;
        }
    }

    module.exports = {
        addDiscount
    }