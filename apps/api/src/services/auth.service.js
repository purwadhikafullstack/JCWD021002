const {
  // getUserQuery,
  getUserRegisterQuery,
  getUserLoginQuery,
  findUserQuery
} = require('../queries/user.query');
const { registerQuery, setPasswordQuery, keepLoginQuery, changePasswordQuery, updateProfileQuery, verifyQuery, resetPasswordQuery, checkTokenQuery, changeEmailQuery } = require('../queries/auth.query');
const short = require('short-uuid');
import bcrypt from 'bcrypt';
import transporter from '../utils/transporter';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';

const sentMail = async (email, template, setPasswordLink) => {
  try {
    const temp = fs.readFileSync(
      path.join(__dirname, '../template', template),
      'utf-8',
    );

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
  } catch (err) {
    throw err
  }
}

export const registerService = async (username, email, password, fullname) => {
  try {
    // Check username and email
    const check = await getUserRegisterQuery({ username, email });
    if (check?.verification_status == "Unverified") throw new Error('Email or username is not verified');
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

    const resetToken = jwt.sign({ email }, secretKey, { expiresIn: '1hr' });
    const setPasswordLink = `${process.env.WEB_BASE_URL}/password?resetToken=${resetToken}`;

    const template = 'emailVerification.html'

    sentMail(email, template, setPasswordLink)

    const googleLogin = 0
    const verification_status = 'Unverified'

    const res = await registerQuery(
      username,
      email,
      hashPassword,
      fullname,
      referralCode,
      resetToken,
      verification_status,
      googleLogin
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

    if (check.status == 'Deactive') throw new Error('Your email is Inactive.');

    const checkPassword = await bcrypt.compare(password, check.password);

    if (!checkPassword) throw new Error('Password is incorrect');

    if (check.verification_status == 'Unverified')
      throw new Error(
        'Your email is not verified, check your email to verify your account.',
      );

    const payload = {
      id: check.id,
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
        id: check.id,
        username: check.username,
        email: check.email,
        fullname: check.fullname,
        avatar: check.avatar,
        role_idrole: check.role_idrole,
        referralCode: check.referralCode,
        googleLogin: check.googleLogin,
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
    if (!check) throw new Error('Email or username has not been registered.');

    if (check.status == 'deactive') throw new Error('Email or username has not been registered.');

    const payload = {
      id: check.id,
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
        id: check.id,
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

    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
      throw new Error('JWT_SECRET_KEY is not set in the environment');
    }

    const resetToken = jwt.sign({ email }, secretKey, { expiresIn: '1hr' });

    const googleLogin = 1
    const verification_status = 'Verified'

    const res = await registerQuery(
      username,
      email,
      password,
      fullname,
      referralCode,
      resetToken,
      verification_status,
      googleLogin
    );

    return res
  } catch (err) {
    throw err;
  }
};

export const setPasswordService = async (resetToken, password) => {
  try {
    const check = await checkTokenQuery(resetToken)

    if (!check) throw new Error('Link verifikasi tidak valid')

    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey)
      throw new Error('JWT_SECRET_KEY is not set in the environment');

    const decoded = jwt.verify(resetToken, secretKey);
    if (typeof decoded == 'object' && 'email' in decoded) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      await setPasswordQuery(decoded.email, hashPassword);
    } else {
      throw new Error('Invalid Token');
    }
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      // Token telah kedaluwarsa, lakukan tindakan sesuai kebutuhan
      throw new Error('Token has expired');
    } else {
      // Kesalahan lain selain TokenExpiredError
      throw err;
    }
  }
};

export const keepLoginService = async (id) => {
  try {
    const res = await keepLoginQuery(id);

    if (!res) throw new Error("User doesn't exist");

    return res;
  } catch (err) {
    throw err;
  }
};

export const changePasswordService = async (id, password, newPassword, confirmPassword) => {
  try {
    if (newPassword == password) throw new Error("New password must be different from the previous password")
    if (confirmPassword !== newPassword) throw new Error("Passwords must match")

    const check = await getUserRegisterQuery({ id })

    if (check.status !== "Active") throw new Error("Maaf email ini belum terdaftar")

    if (check.role_idrole !== 3) throw new Error("Maaf ini hanya berlaku untuk user")

    const checkPassword = await bcrypt.compare(password, check.password)

    if (!checkPassword) throw new Error("Password anda salah")

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt)

    const res = await changePasswordQuery(check.id, hashPassword)

    return res
  } catch (err) {
    throw err
  }
}

export const changeEmailVerifyService = async (id, password) => {
  try {
    const check = await getUserRegisterQuery({ id })

    const checkPassword = await bcrypt.compare(password, check.password)
    if (!checkPassword) throw new Error("Password anda salah")

    return "Terverifikasi"

  } catch (err) {
    throw err
  }
}
export const changeEmailService = async (id, newEmail) => {
  try {
    const check = await getUserRegisterQuery({ id })

    if (check?.email == newEmail) throw new Error("Email sudah digunakan. Silakan gunakan email lain.")

    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
      throw new Error('JWT_SECRET_KEY is not set in the environment');
    }

    const resetToken = jwt.sign({ newEmail }, secretKey, { expiresIn: '1hr' });

    const templateOld = 'emailTemplateOld.html'
    const templateNew = 'emailTemplateNew.html'

    sentMail(check?.email, templateOld)
    sentMail(newEmail, templateNew)

    const res = await changeEmailQuery(id, newEmail, resetToken)

  } catch (err) {
    throw err
  }
}

export const updateProfileService = async (id, username, fullname, avatar) => {
  try {
    const res = await updateProfileQuery({ id, username, fullname, avatar })

    return res
  } catch (err) {
    throw err
  }
}

export const verifyService = async (email, isNew) => {
  try {
    const check = await findUserQuery({ email })

    if (!check) throw new Error('Email yang anda masukkan salah');
    if (check?.dataValues?.googleLogin == 1) throw new Error('Anda tidak bisa mengubah kata sandi google')

    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
      throw new Error('JWT_SECRET_KEY is not set in the environment');
    }

    const resetToken = jwt.sign({ email }, secretKey, { expiresIn: '1hr' });
    let setPasswordLink;
    if (isNew == true) {
      setPasswordLink = `${process.env.WEB_BASE_URL}/password/new?resetToken=${resetToken}`;
    } else if (isNew == false) {
      setPasswordLink = `${process.env.WEB_BASE_URL}/password?resetToken=${resetToken}`;
    }

    const template = 'reset-password.html'

    sentMail(email, template, setPasswordLink)


    const result = await verifyQuery(check?.id, resetToken)

    return result
  } catch (err) {
    throw err
  }
}

export const reVerifyService = async (email, isNew) => {
  try {
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
      throw new Error('JWT_SECRET_KEY is not set in the environment');
    }

    const resetToken = jwt.sign({ email }, secretKey, { expiresIn: '1hr' });
    let setPasswordLink;
    if (isNew == true) {
      setPasswordLink = `${process.env.WEB_BASE_URL}/password/new?resetToken=${resetToken}`;
    } else if (isNew == false) {
      setPasswordLink = `${process.env.WEB_BASE_URL}/password?resetToken=${resetToken}`;
    }

    const template = 'emailVerification.html'

    sentMail(email, template, setPasswordLink)

  } catch (err) {
    throw err
  }
}