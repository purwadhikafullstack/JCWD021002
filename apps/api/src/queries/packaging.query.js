const { Op } = require('sequelize');
import Product from '../models/product.model';
import Packaging from '../models/packaging.model';


const getPaginatedAndFilteredPackagingQuery = async (
    page,
    pageSize,
    sortField,
    sortOrder,
    packagingName,
  ) => {
    try {
  
      const offset = (page - 1) * (pageSize || 0);
  
      const whereCondition = {};
  
      if (packagingName) {
        whereCondition['$Packaging.name$'] = {
          [Op.like]: `%${packagingName}%`,
        };
      }
  
      const packaging = await Packaging.findAll({
        offset,
        limit: pageSize ? parseInt(pageSize) : undefined,
        order: [
            [sortField,
            sortOrder,]
        ],
        where: whereCondition,
      });
      
  
      const totalPackaging = await Packaging.count({
        where: whereCondition,
      });
  
      const totalPages = Math.ceil(totalPackaging / (pageSize || totalPackaging));
  
      return {
        packaging,
        totalPages,
      };
    } catch (err) {
      console.error('Error in getPaginatedAndFilteredPackagingQuery:', err);
      throw err;
    }
  };

  const getPackagingQuery = async (packagingName) => {
    try {
        const result = await Packaging.findAll({
            where: {
                name: packagingName,
            }
        })

        return result;
    } catch (err) {
        throw err;
    }
}

const getPackagingForProductQuery = async (packagingId) => {
  try {
      const result = await Product.findAll({
          where: {
              packaging_idpackaging: packagingId,
          }
      })

      return result;
  } catch (err) {
      throw err;
  }
}

const addPackagingQuery = async (packaging) => {
    try {
        const res = await Packaging.create({ name: packaging, status: 'Active' });
        return res;
    } catch (err) {
        throw err;
    }
};

  
const editPackagingQuery = async (packagingId, packagingNew, status) => {
    try {
        const updatedPackaging = await Packaging.update(
            packagingNew ? { name: packagingNew } : {},
            status ? { status: status } : {},
            {
                where: {
                    id: packagingId,
                },
            }
        );
        return updatedPackaging;
    } catch (err) {
        throw err;
    }
};

const deletePackagingQuery = async (packagingId) => {
    try {
        const deletedPackaging = await Packaging.destroy({
            where: {
                id: packagingId,
            },
        });
        return deletedPackaging;
    } catch (err) {
        throw err;
    }
};


  module.exports = {
      getPaginatedAndFilteredPackagingQuery,
      getPackagingForProductQuery,
      getPackagingQuery,
      addPackagingQuery,
      editPackagingQuery,
      deletePackagingQuery,
  }