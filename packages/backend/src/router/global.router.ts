import { Router, Request, Response } from "express";
import { entryRouter } from "./entry.router";
import { labelRouter } from "./label.router";
import { dayRouter } from "./day.router";

export const globalRouter = Router({ mergeParams: true});

globalRouter.get('/', async (_: Request, res: Response) => {
    res.send('Hallo welt');
  });
globalRouter.use('/label', labelRouter);
globalRouter.use('/entry', entryRouter);
globalRouter.use('/day', dayRouter);