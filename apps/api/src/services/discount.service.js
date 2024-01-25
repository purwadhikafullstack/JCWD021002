const {
    addDiscountQuery,
    getPaginatedAndFilteredDiscountQuery,
    updateDiscountQuery,
    getDetailDiscountQuery,
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

    const getDetailDiscountService = async (id) => {
        try {
            const result = await getDetailDiscountQuery(id);

            return result;
        } catch (err) {
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
        banner,
        discountNom,
        distributionId,
        name,
        description,
        status,
    ) => {
        try {
            const result = await updateDiscountQuery(
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
                banner,
                discountNom,
                distributionId,
                name,
                description,
                status,
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
        getDetailDiscountService,
    }