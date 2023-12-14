const {
    getPaginatedAndFilteredProductsQuery,
} = require("../queries/product.query")

const getPaginatedAndFilteredProductsService = async (page, pageSize, sortField, sortOrder, categoryId, productName, cityId) => {
    try {
      const result = await getPaginatedAndFilteredProductsQuery(page, pageSize, sortField, sortOrder, categoryId, productName, cityId);
  
      console.log("service", page, pageSize, sortField, sortOrder, categoryId, productName);
  
      return result;
    } catch (err) {
      console.error('Error in getPaginatedAndFilteredProductsService:', err);
      throw new Error('Error in ProductService: ' + err.message);
    }
  };

  module.exports = {
      getPaginatedAndFilteredProductsService,
  }
  