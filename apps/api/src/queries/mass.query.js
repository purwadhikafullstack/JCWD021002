const { Op } = require('sequelize');
import Product from '../models/product.model';
import Mass from '../models/mass.model';


const getPaginatedAndFilteredMassQuery = async (
    page,
    pageSize,
    sortField,
    sortOrder,
    massName,
  ) => {
    console.log(sortField, sortOrder);
    try {
  
      const offset = (page - 1) * (pageSize || 0);
  
      const whereCondition = {};
  
      if (massName) {
        whereCondition['$Mass.name$'] = {
          [Op.like]: `%${massName}%`,
        };
      }
  
      const mass = await Mass.findAll({
        offset,
        limit: pageSize ? parseInt(pageSize) : undefined,
        order: [
            [sortField,
            sortOrder,]
        ],
        where: whereCondition,
      });
      
  
      const totalMass = await Mass.count({
        where: whereCondition,
      });
  
      const totalPages = Math.ceil(totalMass / (pageSize || totalMass));
  
      return {
        mass,
        totalPages,
      };
    } catch (err) {
      console.error('Error in getPaginatedAndFilteredMassQuery:', err);
      throw err;
    }
  };

  
  const getMassQuery = async (massName) => {
    try {
        const result = await Mass.findAll({
            where: {
                name: massName,
            }
        })

        return result;
    } catch (err) {
        throw err;
    }
}


const addMassQuery = async (mass) => {
    try {
      console.log(mass);
        const res = await Mass.create({ name: mass, status: 'Active' });
        return res;
    } catch (err) {
        throw err;
    }
};


   
const editMassQuery = async (massId, massNew, status) => {
    try {
      console.log("ini di query",massId, massNew, status);
        const updatedMass = await Mass.update(
          {
            name: massNew,
            status: status,
        },
        {
            where: {
                id: massId,
            },
            }
        );
        return updatedMass;
    } catch (err) {
        throw err;
    }
};

const deleteMassQuery = async (massId) => {
    try {
        const deletedMass = await Mass.destroy({
            where: {
                id: massId,
            },
        });
        return deletedMass;
    } catch (err) {
        throw err;
    }
};

const getMassForProductQuery = async (massId) => {
  try {
    const result = await Product.findAll({
      where: {
        mass_idmass: massId, // Use the correct column name here
      },

    });

    return result;
  } catch (err) {
    throw err;
  }
};



  module.exports = {
      getPaginatedAndFilteredMassQuery,
      getMassQuery,
      getMassForProductQuery,
      addMassQuery,
      editMassQuery,
      deleteMassQuery,
  }