const { Op } = require('sequelize');
import RatingsAndReviews from '../models/ratingsAndReviews.model';
import User from '../models/user.model';
import Order from '../models/order.model';
import OrderDetail from '../models/orderDetail.model';
import ProductStock from '../models/productStock.model';
import Product from '../models/product.model';

// const getPaginatedRatingQuery = async (page, pageSize, rating, sortOrder, productId) => {
//     try {
//         const offset = (page - 1) * (pageSize || 0);

//         const queryOptions = {
//             attributes: ['id', 'rating', 'reviewText', 'reviewDate'],
//             where: {},
//             order: [['rating', 'DESC'], ['reviewDate', sortOrder]],
//             offset,
//             limit: pageSize || undefined,
//             include: [
//                 {
//                     model: User,
//                     attributes: ['id', 'username',], // Add the attributes you want to retrieve from the User model
//                 },
//             ],
//         };

//         // Add productId filter if provided
//         if (productId) {
//             queryOptions.where.product_idproduct = productId;
//         }

//         // Add rating filter if provided, or list all ratings in descending order if rating is null
//         if (rating !== null) {
//             queryOptions.where.rating = rating;
//         }

//         // Fetch paginated ratings
//         const result = await RatingsAndReviews.findAndCountAll(queryOptions);

//         const totalPages = Math.ceil(result.count / (pageSize || result.count));

//         return {
//             ratings: result.rows,
//             totalPages,
//             sortField: 'reviewDate', // Assuming we're always sorting by reviewDate
//         };
//     } catch (err) {
//         console.error('Error in getPaginatedRatingQuery:', err);
//         throw err;
//     }
// };

const getPaginatedRatingQuery = async (page, pageSize, rating, sortOrder, productId) => {
    try {
        const offset = (page - 1) * (pageSize || 0);

        const queryOptions = {
            attributes: ['id', 'rating', 'reviewText', 'reviewDate'],
            where: {},
            order: [['rating', 'DESC'], ['reviewDate', sortOrder]],
            offset,
            limit: pageSize || undefined,
            include: [
                {
                    model: User,
                    attributes: ['id', 'username'], // Add the attributes you want to retrieve from the User model
                },
                {
                    model: Order,
                    attributes: ['id', 'codeTransaction'], // Add the attributes you want to retrieve from the User model
                },
            ],
        };

        // Add productId filter if provided
        if (productId) {
            queryOptions.where.product_idproduct = productId;
        }

        // Add rating filter if provided, or list all ratings in descending order if rating is null
        if (rating !== null) {
            queryOptions.where.rating = rating;
        }

        // Fetch paginated ratings with associated user data
        const result = await RatingsAndReviews.findAndCountAll(queryOptions);

        const totalPages = Math.ceil(result.count / (pageSize || result.count));

        // Censor usernames in the result before returning
        const censoredRatings = result.rows.map((rating) => {
            if (rating.User) {
                // Check if the User association exists
                const originalUsername = rating.User.username;
                const censoredUsername = censorUsername(originalUsername);
                return {
                    ...rating.get(),
                    User: { ...rating.User.get(), username: censoredUsername },
                };
            } else {
                return rating;
            }
        });

        return {
            ratings: censoredRatings,
            totalPages,
            sortField: 'reviewDate', // Assuming we're always sorting by reviewDate
        };
    } catch (err) {
        console.error('Error in getPaginatedRatingQuery:', err);
        throw err;
    }
};

// Function to censor the username
function censorUsername(username) {
    if (username.length < 3) {
        return username;
    }

    const firstChar = username.charAt(0);
    const lastChar = username.charAt(username.length - 1);
    const censoredPart = '*'.repeat(username.length - 2);

    return `${firstChar}${censoredPart}${lastChar}`;
}

const getDetailRatingQuery = async (id, productId) => {
    try {
        const result = await RatingsAndReviews.findOne({
            where: {
                user_iduser: id,
                product_idproduct: productId
            },
            include: [
                {
                    model: Order,
                    attributes: ['orderDate', 'codeTransaction']
                }
            ]
        });

        const orderResults = await OrderDetail.findAll({
            where: {
                '$order.user_iduser$': id
            },
            attributes: ['productStock_idproductStock'],
            include: [
                {
                    model: Order,
                    attributes: ['id', 'codeTransaction', 'orderDate'],
                    required: true,
                    where: {
                        user_iduser: id
                    }
                },
                {
                    model: ProductStock,
                    attributes: [],
                    required: true,
                    include: [
                        {
                            model: Product,
                            attributes: [],
                            where: {
                                id: productId,
                            }
                        },
                    ]
                },
                
            ],
        });

        return {result, orderResults};
    } catch (err) {
        throw err;
    }
}

const addRatingQuery = async ( userId, rating, review, productId, orderId ) => {
    try {
        const result = await RatingsAndReviews.create({
            user_iduser: userId,
            rating: rating,
            reviewText: review,
            reviewDate: new Date(),
            product_idproduct: productId,
            order_idorder: orderId,
        })

        return result;
    } catch (err) {
        throw err;
    }
}

const checkRatingQuery = async (userId, productId) => {
    try {
        const result = await RatingsAndReviews.findOne({
            where: {
                user_iduser: userId,
                product_idproduct: productId,
            },
        });

        return result
    } catch (err) {
        throw err;
    }
}

const deleteRatingQuery = async (userId, productId) => {
    try {
        const result = await RatingsAndReviews.destroy({
            where: { 
                user_iduser: userId,
                product_idproduct: productId,
             }
        });

        return result;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    addRatingQuery,
    getPaginatedRatingQuery,
    getDetailRatingQuery,
    checkRatingQuery,
    deleteRatingQuery,
}