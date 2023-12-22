const {
    getUserQuery,
    updateUserQuery,
    getUserDetailQuery,
    addUserQuery,
    findUserQuery,
} = require('../queries/user.query');
const bcrypt = require("bcrypt");


    const getUserService = async (page, pageSize, roleId) => {
        try {
            const res = await getUserQuery(page, pageSize, roleId)

            return res;
        } catch (err) {
            throw err;
        }
    }

    const updateUserService = async (id, username, email, fullname, avatar, role_idrole, status) => {
        try {
            await updateUserQuery(id, username, email, fullname, avatar, role_idrole, status)
        } catch (err) {
            throw err;
        }
    }

    const getDetailUserService = async (userId) => {
        try {
            const result = await getUserDetailQuery(userId);

            return result;
        } catch (err) {
            throw err;
        }
    }

    const addUserService = async (username, email, password, fullname, avatar, role_idrole) => {
            try {
                const check = await findUserQuery({ email, username });

                if (check) throw new Error("Email or username already exist");
            
                const salt = await bcrypt.genSalt(10);
            
                const hashPassword = await bcrypt.hash(password, salt);
        
                const result = await addUserQuery(username, email, hashPassword, fullname, avatar, role_idrole);
        
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
    }