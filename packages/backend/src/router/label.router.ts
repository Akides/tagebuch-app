import { Router } from 'express';
import { getLabel, getLabels, createLabel, deleteLabel, patchLabel, getLabelByName } from '../controller/label.controller';

export const labelRouter = Router({ mergeParams: true });

labelRouter.get('/', getLabels);
labelRouter.get('/:labelId', getLabel);
labelRouter.get('/getByName/:name', getLabelByName);
labelRouter.post('/', createLabel);
labelRouter.delete('/:labelId', deleteLabel);
labelRouter.patch('/:labelId', patchLabel);
