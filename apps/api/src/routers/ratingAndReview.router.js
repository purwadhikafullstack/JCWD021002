import { Router } from 'express';
import {
    addRatingController,
    getDetailRatingController,
    getPaginatedRatingController
} from '../controllers/ratingAndReview.controller';
import { verifyToken } from '../middlewares/auth';

const ratingRouter = Router();

// GET
ratingRouter.get('/rating-lists', async (req, res) => {
  const result = await getPaginatedRatingController(req, res);
  return result;
});

ratingRouter.get('/rating-detail', async (req, res) => {
    const result = await getDetailRatingController(req, res);
    return result;
  });

// POST
ratingRouter.post('/add-rating', verifyToken, async (req, res) => {
  const result = await addRatingController(req, res);
  return result;
});

export { ratingRouter };
