const {
    getPaginatedAndFilteredMassService,
    addMassService,
    editMassService,
    deleteMassService,
} = require("../services/mass.service.js")

const getPaginatedAndFilteredMassController = async (req, res) => {
    try {
      const page = req.query.page || 1;
      const pageSize = req.query.pageSize || null;
      const sortField = req.query.sortField || 'name';
      const sortOrder = req.query.sortOrder || 'asc';
      const massName = req.query.massName || null;
  
      const result = await getPaginatedAndFilteredMassService(
        page,
        pageSize,
        sortField,
        sortOrder,
        massName,
      );
  
  

      return res.status(200).json(result);
    } catch (err) {
      console.error('Error in getPaginatedAndFilteredProductsController:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  
  const addMassController = async (req, res) => {
      try {
        const { mass } = req.body;
    
        const result = await addMassService(mass);
    
        res.status(201).json({result})
      } catch (err) {
      console.log(err);

        res.status(500).json({error: "internal server error"})
      }
    }
    
    const editMassController = async (req, res) => {
      try {
        const { massId, massNew, status } = req.body;
    
        const result = await editMassService(massId, massNew, status);
      console.log("ini di controller",massId, massNew, status);

    
        res.status(201).json({result})
      } catch (err) {
        console.log(err);
        res.status(500).json({error: "internal server error"})
      }
    }
  
    const deleteMassController = async (req, res) => {
      try {
        const {massId} = req.params;
    
        await deleteMassService(massId)
    
        res.status(201).json({message: 'Mass deleted successfully'})
      } catch (err) {
        console.log(err);
        res.status(500).json({error: "internal server error"})
      }
    }

    module.exports = {
        getPaginatedAndFilteredMassController,
        addMassController,
        editMassController,
        deleteMassController,
    }