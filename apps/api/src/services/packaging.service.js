const {
    getPaginatedAndFilteredPackagingQuery,
    getPackagingForProductQuery,
    addPackagingQuery,
    editPackagingQuery,
    deletePackagingQuery,
    getPackagingQuery,
} = require("../queries/packaging.query")


const getPaginatedAndFilteredPackagingService = async (page, pageSize, sortField, sortOrder, packagingName) => {
    try {
      const result = await getPaginatedAndFilteredPackagingQuery(page, pageSize, sortField, sortOrder, packagingName);
  
      console.log("service result:", result);
  
      return result;
    } catch (err) {
      console.error('Error in getPaginatedAndFilteredProductsService:', err);
      throw new Error('Error in ProductService: ' + err.message);
    }
  };

  
  const addPackagingService = async (packaging) => {
    try {

      if (!packaging || !packaging.trim()) {
        return 'Packaging name cannot be empty or contain only spaces';
    }

        const check = await getPackagingQuery(packaging);
        if (check.length > 0) {
            return ('Packaging name already added')
        }
      const res = await addPackagingQuery(packaging)
      return res;
    } catch (err) {
      throw err;
    }
  }

  const editPackagingService = async (packagingId, packagingNew, status) => {
    try {
      const check = await getPackagingQuery(packagingNew);
        if (check.length > 0) {
            return ('Packaging name already added')
        }
      const res = await editPackagingQuery(packagingId, packagingNew, status)
      return res;
    } catch (err) {
      throw err;
    }
  }

  const deletePackagingService = async (packagingId) => {
    try {
      const res1 = await getPackagingForProductQuery(packagingId)
      console.log("ini res1",res1);
      if(res1.length > 1) {
        return "The Packaging Used in Another Product"
      }
        const res = await deletePackagingQuery(packagingId)
  
        return res;
    } catch (err) {
      throw err;
    }
  }

  module.exports = {
      getPaginatedAndFilteredPackagingService,
      addPackagingService,
      editPackagingService,
      deletePackagingService,
  }