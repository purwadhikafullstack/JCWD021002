const {
  getUserQuery,
  getUserRegisterQuery,
  getUserLoginQuery,
} = require('../queries/user.query');
const { registerQuery } = require('../queries/auth.query');
const short = require('short-uuid');
import bcrypt from 'bcrypt';
import transporter from '../utils/transporter';
import jwt from 'jsonwebtoken';
import fs from "fs"
import path from "path"
import handlebars from "handlebars"

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
    const resetTokenExpiry = new Date(Date.now() + 3600000);

    const temp = await fs.readFileSync(
      path.join(__dirname, '../template', 'emailVerification.html'),
      'utf-8',
    );

    const setPasswordLink = `${process.env.WEB_BASE_URL}/set-password?resetToken=${resetToken}`;
    const tempCompile = await handlebars.compile(temp);
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
    );

    return res;
  } catch (err) {
    throw err;
  }
};

export const loginService = async (emailOrUsername, password) => {
  try {
    const check = await getUserLoginQuery({ emailOrUsername });
    if (!check) throw new Error('Incorrect email or useername');

    const checkPassword = await bcrypt.compare(password, check.password);

    if (!checkPassword) throw new Error('Password is incorrect');

    return { user: check };
  } catch (err) {
    throw err;
  }
};
