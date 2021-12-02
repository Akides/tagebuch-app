import { Router } from "express";
import { addLabel, 
    createEntry, 
    deleteEntry, 
    getEntries, 
    getEntriesByDateInput, 
    getEntriesByInput, 
    getEntriesByLabel, 
    getEntriesCSV, 
    getEntriesSorted, 
    getEntry, getLabels, 
    patchEntry, 
    removeLabel } from '../controller/entry.controller';

export const entryRouter = Router({ mergeParams: true });
entryRouter.post('/', createEntry);
entryRouter.get('/', getEntries);
entryRouter.get('/sorted', getEntriesSorted);
entryRouter.get('/:entryId', getEntry);
entryRouter.delete('/:entryId', deleteEntry);
entryRouter.patch('/:entryId', patchEntry);

entryRouter.get('/byInput/:input', getEntriesByInput);
entryRouter.get('/byLabel/:id', getEntriesByLabel);
entryRouter.get('/byDate/:input', getEntriesByDateInput);

entryRouter.post('/addLabel/:labelId/:entryId', addLabel);
entryRouter.delete('/removeLabel/:labelId/:entryId', removeLabel);
entryRouter.get('/getlabels/:entryId', getLabels);

entryRouter.get('/csv', getEntriesCSV);