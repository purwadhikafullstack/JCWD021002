const {
    getPaginatedAndFilteredProductsQuery,
    getDetailProductQuery,
    addProductQuery,
    addImageProductQuery,
    softDeleteProductQuery,
    updateProductQuery,
} = require("../queries/product.query")

const {
  addCategoryForProductQuery
} = require("../queries/category.query");

const getPaginatedAndFilteredProductsService = async (page, pageSize, sortField, sortOrder, categoryId, productName, cityId) => {
    try {
      const result = await getPaginatedAndFilteredProductsQuery(page, pageSize, sortField, sortOrder, categoryId, productName, cityId);
  
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


  const addProductService = async (name, price, description, createdBy, category, imageUrl, massProduct, massId, packagingId) => {
    try {
        
        const res = await addProductQuery(name, price, description, createdBy, massProduct, massId, packagingId);

        if(imageUrl.length > 0) {
          for (let i = 0; i < imageUrl.length; i++) {
            console.log("ini di image", res.id);
            await addImageProductQuery(imageUrl[i], res.id);
        }
        }

        console.log("ini length", category.length);
        console.log("ini length", category);

        if(category.length > 0) {
          for (let i = 0; i < category.length; i++) {
            console.log("ini di service",res.id);
            await addCategoryForProductQuery(category[i], res.id);
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

      console.log(imageUrl);
      if(imageUrl) {
        for (let i = 0; i < imageUrl.length; i++) {
          await addImageProductQuery(imageUrl[i], id);
      }
      }

      if(category) {
        for (let i = 0; i < category.length; i++) {
          await addCategoryForProductQuery(category[i], id);
      }
      }
    } catch (err) {
      throw err;
    }
    }

  module.exports = {
      getPaginatedAndFilteredProductsService,
      getDetailProductService,
      addProductService,
      softDeleteProductService,
      updateProductService,
  }
  