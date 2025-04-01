import { Handler, HandlerResponse } from '@netlify/functions';
import express, { Request, Response } from 'express';
import { registerRoutes } from '../../server/routes';
import { db } from '../../server/db';
import serverless from 'serverless-http';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Register routes
registerRoutes(app);

// Convert Express app to serverless function
const serverlessHandler = serverless(app);

export const handler: Handler = async (event, context) => {
  const result = await serverlessHandler(event, context);
  return result as HandlerResponse;
}; 