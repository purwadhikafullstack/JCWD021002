import User from '../models/user.model';
const { Op } = require('sequelize');

export const registerQuery = async (
  username,
  email,
  password,
  fullname,
  generateReferralCode,
  resetToken,
  verification_status,
  googleLogin
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
      resetTokenUsed: 0,
      resetTokenExpires: new Date(new Date().getTime() + 3600000),
      verification_status: verification_status,
      googleLogin: googleLogin
    });

    return res;
  } catch (err) {
    throw err;
  }
};

export const setPasswordQuery = async (email, password) => {
  try {
    const res = await User.update(
      { password, verification_status: 'Verified', resetTokenUsed: 1 },
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

export const changePasswordQuery = async (id, hashPassword) => {
  try {
    const res = await User.update({
      password: hashPassword,
    },
      {
        where: {
          id: id
        }
      })
    return res
  } catch (err) {
    throw err
  }
}
export const updateProfileQuery = async ({ id = null, username = null, fullname = null, avatar }) => {
  try {
    const res = await User.update({
      username,
      fullname,
      avatar
    },
      {
        where: {
          id: id
        }
      })

    return res
  } catch (err) {
    throw err
  }
}

export const verifyQuery = async (userId, resetToken) => {
  try {
    const res = await User.update({
      resetToken: resetToken,
      resetTokenUsed: 0,
      resetTokenExpires: new Date(new Date().getTime() + 3600000),
    }, {
      where: {
        id: userId
      }
    })

    return res
  } catch (err) {
    throw err
  }
}

export const checkTokenQuery = async (resetToken) => {
  try {
    const res = await User.findOne({
      attributes: ['id', 'resetTokenUsed'],
      where: {
        resetToken: resetToken,
        resetTokenUsed: 0,
        resetTokenExpires: { [Op.gte]: new Date() }
      },
    })
    return res
  } catch (err) {
    throw err
  }
}

export const changeEmailQuery = async (id, newEmail, resetToken) => {
  try {
    const res = await User.update({
      email: newEmail,
      resetToken: resetToken,
      resetTokenUsed: 0
    }, {
      where: {
        id: id
      }
    })
    return res
  } catch (err) {
    throw err
  }
}
