import User from '../models/user.model';
const { Op } = require('sequelize');

export const registerQuery = async (
  username,
  email,
  password,
  fullname,
  generateReferralCode,
  resetToken,
) => {
  try {
    const res = await User.create({
      username,
      email,
      fullname,
      password,
      registrationDate: new Date(),
      role_idrole: 3,
      status: 'Active',
      referralCode: generateReferralCode,
      resetToken: resetToken,
      verification_status: 'Unverified',
    });

    return res;
  } catch (err) {
    throw err;
  }
};

export const setPasswordQuery = async (email, password) => {
  try {
    const res = await User.update(
      { password, verification_status: 'Verified' },
      {
        where: {
          email,
        },
      },
    );

    return res;
  } catch (err) {
    throw err;
  }
};

export const keepLoginQuery = async (id) => {
  try {
    const res = await User.findByPk(id, {
      attributes: {
        exclude: ["password", "resetToken"]
      }
    });
    return res;
  } catch (err) {
    throw err;
  }
};
