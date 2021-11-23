import { Router, Request, Response } from "express";
import { entryRouter } from "./entry.router";
import { labelRouter } from "./label.router";

export const globalRouter = Router({ mergeParams: true});

globalRouter.get('/', async (_: Request, res: Response) => {
    res.send('Welcome to API');
  });
globalRouter.use('/label', labelRouter);
globalRouter.use('/entry', entryRouter);