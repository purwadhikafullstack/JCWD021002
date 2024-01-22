import {
  registerService,
  loginService,
  setPasswordService,
  loginWithSocialService,
  registerWithSocialService,
  keepLoginService,
  changePasswordService,
  changeEmailService,
  changeEmailVerifyService,
  updateProfileService,
  verifyService,
  reVerifyService
} from '../services/auth.service';

export const registerController = async (req, res) => {
  try {
    const { username, email, password, fullname } = req.body;
    const result = await registerService(username, email, password, fullname);

    return res.status(200).json({
      message: 'Register Success',
      data: result,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const loginController = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;
    const result = await loginService(emailOrUsername, password);

    return res.status(200).json({
      message: 'Login Success',
      data: result,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const loginWithSocialController = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await loginWithSocialService(email);

    return res.status(200).json({
      message: 'Login Success',
      data: result,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const registerWithSocialController = async (req, res) => {
  try {
    const { username, email, fullname } = req.body;
    const result = await registerWithSocialService(username, email, fullname);

    return res.status(200).json({
      message: 'Login Success',
      data: result,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const setPasswordController = async (req, res) => {
  try {
    const { resetToken } = req.query;
    const { password } = req.body;
    const result = await setPasswordService(resetToken, password);
  
    res.status(200).json({
      message: "Set password success",
      data: result,
    })
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export const keepLoginController = async (req, res) => {
  try {
    const id = req.user?.id;


    if (id === undefined) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const result = await keepLoginService(id);

    return res.status(200).json({
      message: "Success",
      data: result
    });
  } catch (err) {
    return res.status(500).send(err.message)
  }
};

export const changePasswordController = async (req, res) => {
  try {
    const { id } = req.params;
    const { password, newPassword } = req.body

    const result = await changePasswordService(id, password, newPassword)

    return res.status(200).json({
      message: 'Change Password Success',
      data: result,
    })

  } catch (err) {
    return res.status(500).send(err.message)
  }
}

export const changeEmailController = async (req, res) => {
  try {
    const { id } = req.params;
    const { newEmail } = req.body;

    const result = await changeEmailService(id, newEmail)

    return res.status(200).json({
      message: "Change Email Success",
      data: result
    })
  } catch (err) {
    return res.status(500).send(err.message)
  }
}
export const changeEmailVerifyController = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    const result = await changeEmailVerifyService(id, password)
    return res.status(200).json({
      message: "Email Terverifikasi",
      data: result
    })
  } catch (err) {
    return res.status(500).send(err.message)
  }
}
export const updateProfileController = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, fullname } = req.body;

    const avatar = req.file?.filename;

    const result = await updateProfileService(id, username, fullname, avatar)
    return res.status(200).json({
      message: "Email Terverifikasi",
      data: result
    })
  } catch (err) {
    return res.status(500).send(err.message)
  }
}

export const verifyController = async (req, res) => {
  try {
    console.log('==. cont', req.body)
    const { email, isNew } = req.body
    const result = await verifyService(email, isNew)

    res.status(200).json({
      message: 'Verify Success',
      data: result
    })
  } catch (err) {
    return res.status(500).send(err.message)
  }
}
export const reVerifyController = async (req, res) => {
  try {
    const { email, isNew } = req.body;
    const result = await reVerifyService(email, isNew)

    res.status(200).json({
      message: 'Verifikasi berhasil di kirim',
      data: result
    })
  } catch (err) {
    return res.status(500).send(err.message)
  }
}