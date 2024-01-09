import { Router } from 'express';
import {
  getCityController,
} from '../controllers/city.controller';


const cityRouter = Router();

cityRouter.get('/getCity', async (req, res) => {
  await getCityController(req, res);
});


export { cityRouter };
