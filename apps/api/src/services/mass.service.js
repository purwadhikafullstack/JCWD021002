const {
    getPaginatedAndFilteredMassQuery,
    getMassForProductQuery,
    addMassQuery,
    editMassQuery,
    deleteMassQuery,
    getMassQuery,
} = require("../queries/mass.query.js")


const getPaginatedAndFilteredMassService = async (page, pageSize, sortField, sortOrder, massName) => {
    try {
      const result = await getPaginatedAndFilteredMassQuery(page, pageSize, sortField, sortOrder, massName);
  
      console.log("service result:", result);
  
      return result;
    } catch (err) {
      console.error('Error in getPaginatedAndFilteredProductsService:', err);
      throw new Error('Error in ProductService: ' + err.message);
    }
  };

  
  const addMassService = async (mass) => {
    try {

      if (!mass || !mass.trim()) {
        return 'Mass name cannot be empty or contain only spaces';
    }

        const check = await getMassQuery(mass);
        if (check.length > 0) {
            return ('Mass name already added')
        }
      const res = await addMassQuery(mass);
      return res;
    } catch (err) {
      throw err;
    }
  }

  const editMassService = async (massId, massNew, status) => {
    try {
      const check = await getMassQuery(massNew);
        if (check.length > 0) {
            return ('Mass name already added')
        }
      const res = await editMassQuery(massId, massNew, status)
      return res;
    } catch (err) {
      throw err;
    }
  }

  const deleteMassService = async (massId) => {
    try {
      const res1 = await getMassForProductQuery(massId)
      console.log("ini res1",res1);
      if(res1.length > 1) {
        return "The Mass Used in Another Product"
      }
      
        const res = await deleteMassQuery(massId)
  
        return res;
    } catch (err) {
      throw err;
    }
  }

  module.exports = {
      getPaginatedAndFilteredMassService,
      addMassService,
      editMassService,
      deleteMassService,
  }