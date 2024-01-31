const {
    getPaginatedAndFilteredPackagingService,
    addPackagingService,
    editPackagingService,
    deletePackagingService,
} = require("../services/packaging.service")

const getPaginatedAndFilteredPackagingController = async (req, res) => {
    try {
      const page = req.query.page || 1;
      const pageSize = req.query.pageSize || null;
      const sortField = req.query.sortField || 'name';
      const sortOrder = req.query.sortOrder || 'asc';
      const packagingName = req.query.packagingName || null;
  
      const result = await getPaginatedAndFilteredPackagingService(
        page,
        pageSize,
        sortField,
        sortOrder,
        packagingName,
      );
  
  
      console.log("controller result:", result);
      return res.status(200).json(result);
    } catch (err) {
      console.error('Error in getPaginatedAndFilteredProductsController:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  
  const addPackagingController = async (req, res) => {
      try {
        const { packaging } = req.body;
    
        const result = await addPackagingService(packaging);
    
        res.status(201).json({result})
      } catch (err) {
        console.log(err);
        res.status(500).json({error: "internal server error"})
      }
    }
    
    const editPackagingController = async (req, res) => {
      try {
        const { packagingId, packagingNew, status } = req.body;
    
        const result = await editPackagingService(packagingId, packagingNew, status);
    
        res.status(201).json({result})
      } catch (err) {
        res.status(500).json({error: "internal server error"})
      }
    }
  
    const deletePackagingController = async (req, res) => {
      try {
        const {packagingId} = req.params;
    
        const serviceResponse = await deletePackagingService(packagingId)
    
        res.status(201).json({message: 'Packaging deleted successfully'})
      } catch (err) {
        console.log(err);
        res.status(500).json({error: "internal server error"})
      }
    }

    module.exports = {
        getPaginatedAndFilteredPackagingController,
        addPackagingController,
        editPackagingController,
        deletePackagingController,
    }