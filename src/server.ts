import express, { NextFunction, Request, Response, }  from "express";
import 'express-async-errors';
import { routes } from "./routes";

const app = express();

app.use(express.json());

app.use(routes);

app.use(
  (err: Error, request: Request, repsonse: Response, next: NextFunction) => {
    if(err instanceof Error) {
      return repsonse.status(400).json({
        message: err.message,
      });
    }

    return repsonse.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
);

app.listen(3333, () => console.log('Server is running'));
