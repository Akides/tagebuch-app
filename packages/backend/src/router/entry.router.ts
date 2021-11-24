import { Router } from "express";
import { addLabel, createEntry, deleteEntry, getEntries, getEntry, getLabels, patchEntry, removeLabel } from '../controller/entry.controller';

export const entryRouter = Router({ mergeParams: true });
entryRouter.post('/', createEntry);
entryRouter.get('/', getEntries);
entryRouter.get('/:entryId', getEntry);
entryRouter.delete('/:entryId', deleteEntry);
entryRouter.patch('/:entryId', patchEntry);
entryRouter.post('/addLabel/:labelId/:entryId', addLabel);
entryRouter.delete('/removeLabel/:labelId/:entryId', removeLabel);
entryRouter.get('/getlabels/:entryId', getLabels);