const { getUserQuery } = require('../queries/user.query');
const { registerQuery, loginQuery } = require('../queries/auth.query');
const short = require('short-uuid');

const getUserService = async () => {
  try {
    const res = await getUserQuery();

    return res;
  } catch (err) {
    throw err;
  }
};

export const registerService = async (username, email, password, fullname) => {
  try {
    const check = await getUserQuery({ username, email });

    if (check) throw new Error('Email or username has already existed');

    let referralCode;
    let isReferralCodeUnique = false;

    while (!isReferralCodeUnique) {
      const generateReferralCode = () => {
        const uuid = short.generate();
        const referralCode = uuid.substr(0, 8).toUpperCase();
        return referralCode;
      };
      referralCode = generateReferralCode();

      const checkReferralCode = await getUserQuery({ referralCode });

      if (!checkReferralCode) isReferralCodeUnique = true
    }

    const res = await registerQuery(
      username,
      email,
      password,
      fullname,
      referralCode,
    );

    return res;
  } catch (err) {
    throw err;
  }
};

export const loginService = async (username, email, password) => {
  try {
    const check = await getUserQuery({username, email})
    console.log("email",email)
    console.log("check",check)
    if (!check) throw new Error("Incorrect email or useername")

    return {user: check}
  } catch (err) {
    throw err
  }
}

// module.exports = { getUserService, registerService };
