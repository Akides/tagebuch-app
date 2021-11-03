import { Router } from "express";
import { createEntry, getEntries, getEntry } from '../controller/entry.controller';

export const entryRouter = Router({ mergeParams: true });
entryRouter.post('/', createEntry);
entryRouter.get('/', getEntries);
entryRouter.get(':entryId', getEntry);