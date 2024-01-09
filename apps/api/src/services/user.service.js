const {
    getUserQuery,
    updateUserQuery,
    getDetailUserQuery,
    addUserQuery,
    findUserQuery,
    getStoreQuery,
} = require('../queries/user.query');
const bcrypt = require("bcrypt");


    const getUserService = async (page, pageSize, roleId, username) => {
        try {
            const res = await getUserQuery(page, pageSize, roleId, username)

            return res;
        } catch (err) {
            throw err;
        }
    }

    const updateUserService = async (id, username, email, fullname, avatar, role_idrole, status, store_idstore) => {
        try {
            await updateUserQuery(id, username, email, fullname, avatar, role_idrole, status, store_idstore)
        } catch (err) {
            throw err;
        }
    }

    const getDetailUserService = async (userId) => {
        try {
            const result = await getDetailUserQuery(userId);

            return result;
        } catch (err) {
            throw err;
        }
    }

    const addUserService = async (username, email, fullname, password, avatar, role_idrole, store_idstore) => {
            try {
                const check = await findUserQuery({ email, username });

                if (check) throw new Error("Email or username already exist");
            
                const salt = await bcrypt.genSalt(10);
            
                const hashPassword = await bcrypt.hash(password, salt);
        
                const result = await addUserQuery(username, email, fullname, hashPassword, avatar, role_idrole, store_idstore);
        
                return result;
            } catch (err) {
                throw err;
            }
        }

        const getStoreService = async () => {
            try {
                const result = await getStoreQuery();

                return result;
            } catch (err) {
                throw err;
            }
        }

    module.exports = {
        getUserService,
        updateUserService,
        getDetailUserService,
        addUserService,
        getStoreService,
    }