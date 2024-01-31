const { 
    addRatingService,
    getPaginatedRatingService,
    getDetailRatingService,
 } = require('../services/ratingAndReview.service');

const getPaginatedRatingController = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const pageSize = parseInt(req.query.pageSize) || null;
        const rating = req.query.rating || null;
        const sortOrder = req.query.sortOrder || 'asc';
        const productId = req.query.productId || null;

        const result = await getPaginatedRatingService(page, pageSize, rating, sortOrder, productId);

        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({error: "Internal server error"});
    }
}

const getDetailRatingController = async ( req, res ) => {
    try {
        const { userId, productId } = req.query;

        const result = await getDetailRatingService(userId, productId);

        return res.status(200).json({result});
    } catch (err) {
        console.log(err);
        return res.status(500).json({error: "Internal server error"});
    }
}

const addRatingController = async ( req, res ) => {
    try {
        const { id } = req.user;
        const { rating, review, productId, orderId } = req.body;

        const result = await addRatingService( id, rating, review, productId, orderId );

        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({error: "Internal Server Error"});
    }
}

module.exports = {
    addRatingController,
    getPaginatedRatingController,
    getDetailRatingController,
}