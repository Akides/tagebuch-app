import { Router } from 'express';
import { getLabel, getLabels, createLabel, deleteLabel, patchLabel, getLabelWithName } from '../controller/label.controller';

export const labelRouter = Router({ mergeParams: true });

labelRouter.get('/', getLabels);
labelRouter.get('/:labelId', getLabel);
labelRouter.get('/getWithName/:name', getLabelWithName);
labelRouter.post('/', createLabel);
labelRouter.delete('/:labelId', deleteLabel);
labelRouter.patch('/:labelId', patchLabel);
