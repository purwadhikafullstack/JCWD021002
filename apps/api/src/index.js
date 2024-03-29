import express, { json, Express } from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import { join } from 'path';
const path = require("path");
import { NODE_ENV, PORT } from './config';
import router from './router';
import { DB } from './db';
import cron from 'node-cron'; // Import the 'cron' library
import { finishUnconfirmedOrders } from './utils/cronJob';

/**
 * Serve "web" project build result (for production only)
 * @param {Express} app
 */
const serveWebProjectBuildResult = (app) => {
  if (NODE_ENV !== 'development') {
    const clientPath = '../../web/dist';
    app.use(express.static(join(__dirname, clientPath)));

    // Serve the HTML page
    app.get('*', (req, res) => {
      res.sendFile(join(__dirname, clientPath, 'index.html'));
    });
  }
};

/**
 * Global error handler
 * @param {Express} app
 */
const globalAPIErrorHandler = (app) => {
  // not found
  app.use((req, res, next) => {
    if (req.path.includes('/api/')) {
      res.status(404).send('Not found !');
    } else {
      next();
    }
  });

  // error
  app.use((err, req, res, next) => {
    if (req.path.includes('/api/')) {
      console.error('Error : ', err.stack);
      res.status(500).send('Error !');
    } else {
      next();
    }
  });
};

/**
 * Main function of API project
 */
const main = () => {
  DB.initialize();

  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use('/api', router);

  app.use("/uploads", express.static(path.join(__dirname, "./public/images")));

  globalAPIErrorHandler(app);
// Schedule the cron job to run every minute
cron.schedule('* * * * *', async () => {
  try {
    // Your cron job logic here
    await finishUnconfirmedOrders();
  } catch (error) {
    console.error('Error in cron job:', error);
  }
});

  serveWebProjectBuildResult(app);

  app.listen(PORT, (err) => {
    if (err) {
      console.log(`ERROR: ${err}`);
    } else {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
    }
  });
};

main();
