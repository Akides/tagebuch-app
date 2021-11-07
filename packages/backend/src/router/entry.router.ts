import { Router } from "express";
import { createEntry, deleteEntry, getEntries, getEntry, patchEntry } from '../controller/entry.controller';

export const entryRouter = Router({ mergeParams: true });
entryRouter.post('/', createEntry);
entryRouter.get('/', getEntries);
entryRouter.get('/:entryId', getEntry);
entryRouter.delete('/:entryId', deleteEntry);
entryRouter.patch('/:entryId', patchEntry);