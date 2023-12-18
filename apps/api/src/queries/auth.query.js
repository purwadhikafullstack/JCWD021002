import User from '../models/user.model';
const { Op } = require('sequelize');

export const registerQuery = async (username, email, password, fullname, generateReferralCode) => {
  try {
    const res = await User.create({
      username,
      email,
      password,
      fullname,
      registrationDate : new Date(),
      role_idrole : 3,
      status: "Inactive",
      referralCode : generateReferralCode,
    });

    return res;
  } catch (err) {
    throw err;
  }
};


// module.exports = { registerQuery, loginQuery };
