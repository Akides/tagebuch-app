import { Router, Request, Response } from "express";
import { labelRouter } from "./label.router";

export const globalRouter = Router({ mergeParams: true});

globalRouter.get('/', async (_: Request, res: Response) => {
    res.send('Hallo welt');
  });

globalRouter.use('/label', labelRouter);