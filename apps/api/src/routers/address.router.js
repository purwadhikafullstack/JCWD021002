import { Router } from 'express';
import {
  getProvinceController,
  getCityController,
  createAddressController
} from '../controllers/address.controller';


const addressRouter = Router();

addressRouter.get('/getProvince', async (req, res) => {
  await getProvinceController(req, res);
});
addressRouter.get('/getCity/:id', async (req, res) => {
  await getCityController(req, res);
});
addressRouter.post('/createAddress', async (req, res) => {
  await createAddressController(req, res);
});


export { addressRouter };
