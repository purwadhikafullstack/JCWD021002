const {
  // getUserQuery,
  getUserRegisterQuery,
  getUserLoginQuery,
} = require('../queries/user.query');
const { registerQuery, setPasswordQuery } = require('../queries/auth.query');
const short = require('short-uuid');
import bcrypt from 'bcrypt';
import transporter from '../utils/transporter';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';

export const registerService = async (username, email, password, fullname) => {
  try {
    // Check username and email
    const check = await getUserRegisterQuery({ username, email });
    if (check) throw new Error('Email or username has already existed');

    // hash Password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Generate Referral Code
    let referralCode;
    let isReferralCodeUnique = false;

    while (!isReferralCodeUnique) {
      const generateReferralCode = () => {
        const uuid = short.generate();
        const referralCode = uuid.substr(0, 8).toUpperCase();
        return referralCode;
      };
      referralCode = generateReferralCode();

      const checkReferralCode = await getUserRegisterQuery({ referralCode });

      if (!checkReferralCode) isReferralCodeUnique = true;
    }

    // Pengiriman Email
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
      throw new Error('JWT_SECRET_KEY is not set in the environment');
    }

    const resetToken = jwt.sign({ email }, secretKey);

    const temp = fs.readFileSync(
      path.join(__dirname, '../template', 'emailVerification.html'),
      'utf-8',
    );

    const setPasswordLink = `${process.env.WEB_BASE_URL}/set-password?resetToken=${resetToken}`;
    const tempCompile = handlebars.compile(temp);
    const tempResult = tempCompile({
      email: email,
      verificationLink: setPasswordLink,
    });
    const emailUser = process.env.EMAIL_USER;

    if (typeof emailUser !== 'string') {
      throw new Error('GMAIL_USER is not set in the environment');
    }

    if (typeof email !== 'string') {
      throw new Error('Recipient email is invalid');
    }

    await transporter.sendMail({
      from: emailUser,
      to: email,
      subject: 'Email Confirmation',
      html: tempResult,
    });

    const res = await registerQuery(
      username,
      email,
      hashPassword,
      fullname,
      referralCode,
      resetToken,
    );

    return res;
  } catch (err) {
    throw err;
  }
};

export const loginService = async (emailOrUsername, password) => {
  try {
    const check = await getUserLoginQuery({ emailOrUsername });
    if (!check) throw new Error('Incorrect email or username');

    const checkPassword = await bcrypt.compare(password, check.password);

    if (!checkPassword) throw new Error('Password is incorrect');

    if (check.verification_status == 'Unverified')
      throw new Error(
        'Your email is not verified, check your email to verify your account.',
      );
    if (check.status == 'Inactive') throw new Error('Your email is Inactive.');

    const payload = {
      username: check.username,
      email: check.email,
      fullname: check.fullname,
      avatar: check.avatar,
    };

    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) throw new Error('JWT_SECRET_KEY is not set in environment');

    const token = jwt.sign(payload, secretKey, {
      expiresIn: '1hr',
    });

    return {
      user: {
        username: check.username,
        email: check.email,
        fullname: check.fullname,
        avatar: check.avatar,
        role_idrole: check.role_idrole,
      },
      token,
    };
  } catch (err) {
    throw err;
  }
};

export const loginWithSocialService = async (email) => {
  try {
    const check = await getUserRegisterQuery({ email });
    if (!check) throw new Error('Email or username has not been registered');

    if (check.status == 'Inactive') throw new Error('Your email is Inactive.');

    const payload = {
      username: check.username,
      email: check.email,
      fullname: check.fullname,
      avatar: check.avatar,
    };

    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) throw new Error('JWT_SECRET_KEY is not set in environment');

    const token = jwt.sign(payload, secretKey, {
      expiresIn: '1hr',
    });

    return {
      user: {
        username: check.username,
        email: check.email,
        fullname: check.fullname,
        avatar: check.avatar,
        role_idrole: check.role_idrole,
      },
      token,
    };
  } catch (err) {
    throw err;
  }
};

export const registerWithSocialService = async (username, email, fullname) => {
  try {
    const check = await getUserRegisterQuery({ email });
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

      const checkReferralCode = await getUserRegisterQuery({ referralCode });

      if (!checkReferralCode) isReferralCodeUnique = true;
    }

    const password = null

    const res = await registerQuery(
      username,
      email,
      password,
      fullname,
      referralCode,
    );

    return res
  } catch (err) {
    throw err;
  }
};

export const setPasswordService = async (resetToken, password) => {
  try {
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey)
      throw new Error('JWT_SECRET_KEY is not set in the environment');

    const decoded = jwt.verify(resetToken, secretKey);
    console.log(decoded);
    if (typeof decoded == 'object' && 'email' in decoded) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      await setPasswordQuery(decoded.email, hashPassword);
    } else {
      throw new Error('Invalid Token');
    }
    // const
  } catch (err) {
    throw err;
  }
};
