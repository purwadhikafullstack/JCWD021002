const { 
    addRatingQuery,
    getPaginatedRatingQuery, 
    getDetailRatingQuery,
 } = require('../queries/ratingAndReview.query');


const getPaginatedRatingService = async (page, pageSize, rating, sortOrder, productId) => {
    try {
        const result = await getPaginatedRatingQuery(page, pageSize, rating, sortOrder, productId);

        return result;
    } catch (err) {
        throw err;
    }
}

const getDetailRatingService = async (id, productId) => {
    try {
        const result = getDetailRatingQuery(id, productId);

        return result;
    } catch (err) {
        throw err;
    }
}

const addRatingService = async ( userId, rating, review, productId, orderId ) => {
    try{

        const check = await checkRatingQuery(userId, productId);
        if(check) {
         await deleteRatingQuery(userId, productId);
        const result = await addRatingQuery( userId, rating, review, productId, orderId );

        return result;
        }

        const result = await addRatingQuery( userId, rating, review, productId, orderId );

        return result;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    addRatingService,
    getPaginatedRatingService,
    getDetailRatingService,
}