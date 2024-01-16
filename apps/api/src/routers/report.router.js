import { Router } from 'express';
import {
  getSalesByDateController,
  getProductsByTransactionController,
  createSalesReportController,
} from '../controllers/report.controller';

const reportRouter = Router();

// GET
reportRouter.get('/sales-by-date', async (req, res) => {
  const result = await getSalesByDateController(req, res);
  return result
});

reportRouter.get('/order-detail/:transactionId', async (req, res) => {
    const result = await getProductsByTransactionController(req, res);
    return result
});

reportRouter.get('/sales-report', async (req, res) => {
    const result = await createSalesReportController(req, res);
    return result
});

// // POST
// sampleRouter.post('/', async (req, res) => {
//   await createSampleData();
//   res.send('Create Sample Data');
// });

export { reportRouter };
