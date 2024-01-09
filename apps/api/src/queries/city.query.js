import City from '../models/city.model';
import Store from '../models/store.model';
import Province from '../models/province.model'
const { Op } = require('sequelize');

export const getCityQuery = async (cityName) => {
  try {
    const res = await City.findOne({
      include: [
        {model: Province}
      ],
      where: { 
        city: { 
          [Op.like]: `%${cityName}%` 
      },
    },
    });

    return res;
  } catch (err) {
    throw err;
  }
};
