const {
    getUserService,
    updateUserService,
    getDetailUserService,
    addUserService,
} = require('../services/user.service');


    const getUserController = async (req, res) => {
        try {
            const page = req.query.page || 1;
            const pageSize = parseInt(req.query.pageSize) || null;
            const roleId = req.query.roleId || null;

            const result = await getUserService(page, pageSize, roleId);

            return res.status(200).json(result);
        } catch (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

    }

    const updateUserController = async (req, res) => {
        try {
            const { id, username, email, fullname, avatar, role_idrole, status } = req.body

            await updateUserService(id, username, email, fullname, avatar, role_idrole, status);
            res.status(201).json({message: 'User updated successfully'})
        } catch (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    const getUserDetailController = async (req, res) => {
        try {
            const {id} = req.params;
            console.log(id);
            const result = await getDetailUserService(id);

            res.status(201).json({result});
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    const addUserController = async (req, res) => {
        try {
            const { id, username, email, fullname, password, avatar, role_idrole } = req.body

            const result = await updateUserService(id, username, email, fullname, password, avatar, role_idrole );
            res.status(201).json({message: 'User added successfully', result})
        } catch (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }



    module.exports = {
        getUserController,
        updateUserController,
        getUserDetailController,
        addUserController,
    }
