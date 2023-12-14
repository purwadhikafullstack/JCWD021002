import User from '../models/user.model';
// import Role from '../models/role.model';
import { Op } from 'sequelize';

export const getUserQuery = async ({
  username = null,
  email = null,
  referralCode = null,
}) => {
  try {
    const res = await User.findOne({
      where: {
        [Op.or]: {
          username,
          email,
          referralCode,
        },
      },
    });
    console.log('query email', email);
    console.log('query username', username);
    return res;
  } catch (err) {
    throw err;
  }
};
