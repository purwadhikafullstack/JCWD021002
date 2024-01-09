const {
    getPaginatedAndFilteredProductsQuery,
    getPaginatedAndFilteredProductsRealQuery,
    getDetailProductQuery,
    addProductQuery,
    addImageProductQuery,
    softDeleteProductQuery,
    updateProductQuery,
    getDetailProductRealQuery,
    deleteProductImageQuery,
} = require("../queries/product.query")

const {
  addCategoryForProductQuery
} = require("../queries/category.query");

const getPaginatedAndFilteredProductsService = async (page, pageSize, sortField, sortOrder, categoryId, productName, cityId, storeId, statusProduct, statusStock) => {
    try {
      const result = await getPaginatedAndFilteredProductsQuery(page, pageSize, sortField, sortOrder, categoryId, productName, cityId, storeId, statusProduct, statusStock);
  
      console.log("service", page, pageSize, sortField, sortOrder, categoryId, productName);
  
      return result;
    } catch (err) {
      console.error('Error in getPaginatedAndFilteredProductsService:', err);
      throw new Error('Error in ProductService: ' + err.message);
    }
  };

  const getPaginatedAndFilteredProductsRealService = async (page, pageSize, sortField, sortOrder, categoryId, productName, status) => {
    try {
      const result = await getPaginatedAndFilteredProductsRealQuery(page, pageSize, sortField, sortOrder, categoryId, productName, status);
  
      console.log("service", page, pageSize, sortField, sortOrder, categoryId, productName);
      console.log("service result:", result);
  
      return result;
    } catch (err) {
      console.error('Error in getPaginatedAndFilteredProductsService:', err);
      throw new Error('Error in ProductService: ' + err.message);
    }
  };

  const getDetailProductService = async (id) => {
    try {
      const result = await getDetailProductQuery(id);

      return result;
    } catch(err) {
          throw err;
    }
  }

  const getDetailProductRealService = async (id) => {
    try {
      const result = await getDetailProductRealQuery(id);

      return result;
    } catch(err) {
          throw err;
    }
  }


  const addProductService = async (name, price, description, createdBy, category, imageUrl, massProduct, massId, packagingId) => {
    try {
        
        const res = await addProductQuery(name, price, description, createdBy, massProduct, massId, packagingId);

        if(imageUrl?.length > 0) {
          for (let i = 0; i < imageUrl.length; i++) {
            console.log("ini di image", res.id);
            await addImageProductQuery(imageUrl[i], res.id);
        }
        }

        if(category?.length > 0) {
          for (let i = 0; i < category.length; i++) {
            console.log("ini di service",res.id);
            console.log("ini di service",category[i]?.id);

            await addCategoryForProductQuery(category[i]?.id, res.id);
        }
        }
        
        return res;
    } catch (err) {
        throw err
    } 
}

  const softDeleteProductService = async (id) => {
    try {
      await softDeleteProductQuery(id);
    } catch (err) {
      throw err;
    }
  }

  const updateProductService = async (id, name, description, price, status, category, imageUrl, massProduct, massId, packagingId) => {
    try {
      await updateProductQuery(id, name, description, price, status, massProduct, massId, packagingId);

      if(imageUrl) {
        for (let i = 0; i < imageUrl?.length; i++) {
          await addImageProductQuery(imageUrl[i], id);
      }
      }

      if(category) {
        for (let i = 0; i < category?.length; i++) {
          await addCategoryForProductQuery(category[i]?.id, id);
      }
      }
    } catch (err) {
      console.log(err);

      throw err;
    }
    }

    const deleteProductImageService = async (imageUrl, productId) => {
      try {
        const res = deleteProductImageQuery(imageUrl, productId)

        return res;
      } catch (err) {
        throw err;
      }
    }

  module.exports = {
      getPaginatedAndFilteredProductsService,
      getPaginatedAndFilteredProductsRealService,
      getDetailProductService,
      addProductService,
      softDeleteProductService,
      updateProductService,
      getDetailProductRealService,
      deleteProductImageService,
  }
  