const {
    addDiscountQuery,
    getPaginatedAndFilteredDiscountQuery,
    updateDiscountQuery,
} = require('../queries/discount.query')


    const getPaginatedAndFilteredDiscountService = async (
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
    ) => {
        try {
            const result = await getPaginatedAndFilteredDiscountQuery(
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
                    )

                    return result;
        } catch (err) {
            console.error('Error in getPaginatedAndFilteredDiscountService:', err);

            throw err;
        }
    } 

    const addDiscountService = async (
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
        banner,
        discountNom,
        distributionId,
    ) => {
        try {
            const result = await addDiscountQuery(
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
                banner,
                discountNom,
                distributionId,
                    );

                    return result;
        } catch (err) {
            throw err;
        }
    }

    const updateDiscountService = async (
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
        banner,
        discountNom,
        distributionId,
    ) => {
        try {
            const result = await updateDiscountQuery(
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
                banner,
                discountNom,
                distributionId,
                    );

                    return result;
        } catch (err) {
            throw err;
        }
    }

    module.exports = {
        addDiscountService,
        getPaginatedAndFilteredDiscountService,
        updateDiscountService,
    }