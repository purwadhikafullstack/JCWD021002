import User from '../models/user.model';
// import Role from '../models/role.model';
import { Op } from 'sequelize';

export const getUserRegisterQuery = async ({
  username = null,
  email = null,
  referralCode = null,
}) => {
  try {
    const res = await User.findOne({
      where: {
        [Op.or]: {
          username: username,
          email: email,
          referralCode,
        },
      },
    });
    return res;
  } catch (err) {
    throw err;
  }
};
export const getUserLoginQuery = async ({ emailOrUsername }) => {
  try {
    const res = await User.findOne({
      where: {
        [Op.or]: {
          username: emailOrUsername,
          email: emailOrUsername,
        },
      },
    });
    
    return res;
  } catch (err) {
    throw err;
  }
};
