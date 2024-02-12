import { Router } from 'express';
import {
  getProvinceController,
  createAddressController,
  getAddressController,
  changeAddressController,
  deleteAddressController
} from '../controllers/address.controller';

const addressRouter = Router();

addressRouter.get('/getProvince', async (req, res) => {
  await getProvinceController(req, res);
});
addressRouter.get('/getAddress/:id', async (req, res) => {
  await getAddressController(req, res);
});
addressRouter.post('/createAddress', async (req, res) => {
  await createAddressController(req, res);
});
addressRouter.patch('/changeAddress', async (req, res) => {
  await changeAddressController(req, res);
});
addressRouter.patch('/delete/:id', async (req, res) => {
  await deleteAddressController(req, res);
});


export { addressRouter };
