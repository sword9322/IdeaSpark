import { Handler, HandlerResponse } from '@netlify/functions';
import express from 'express';
import { registerRoutes } from '../../server/routes';
import { db } from '../../server/db';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Register routes
registerRoutes(app);

// Convert Express app to Netlify function
const handler: Handler = async (event, context) => {
  const serverlessHandler = app;
  return new Promise<HandlerResponse>((resolve, reject) => {
    const req = Object.assign(express.request, {
      method: event.httpMethod,
      url: event.path,
      headers: event.headers,
      body: event.body ? JSON.parse(event.body) : undefined,
    });
    const res = Object.assign(express.response, {
      statusCode: 200,
      headers: {},
      body: '',
      setHeader: (name: string, value: string) => {
        res.headers[name] = value;
      },
      end: (body: string) => {
        res.body = body;
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: res.body,
        });
      },
    });
    serverlessHandler(req, res);
  });
};

export { handler }; 