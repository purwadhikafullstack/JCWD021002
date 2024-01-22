const {
    getUserService,
    updateUserService,
    getDetailUserService,
    addUserService,
    getStoreService,
} = require('../services/user.service');


    const getUserController = async (req, res) => {
        try {
            const page = req.query.page || 1;
            const pageSize = parseInt(req.query.pageSize) || null;
            const roleId = req.query.roleId || null;
            const username = req.query.username || null;

            const result = await getUserService(page, pageSize, roleId, username);

            return res.status(200).json(result);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

    }

    const updateUserController = async (req, res) => {
        try {
            const { id, username, email, fullname, role_idrole, status, store_idstore } = req.body

            await updateUserService(id, username, email, fullname, req.file?.filename, role_idrole, status, store_idstore);
            return res.status(201).json({message: 'User updated successfully'})
        } catch (err) {
            console.log(err);
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
            const { username, email, fullname, password, role_idrole, store_idstore } = req.body

            const result = await addUserService( username, email, fullname, password, req.file?.filename, role_idrole, store_idstore );
            res.status(201).json({message: 'User added successfully', result})
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    const getStoreController = async (req, res) => {
        try {
            const {cityId} = req.query;
            const result = await getStoreService(cityId);

            return res.status(200).json(result);
        } catch (err) {
            console.log(err);
            return res.status(500).json({error : 'Internal Server Error'})
        }
    }



    module.exports = {
        getUserController,
        updateUserController,
        getUserDetailController,
        addUserController,
        getStoreController,
    }
