import { Router } from "express";
import { getLabel, getLabels, createLabel } from '../controller/label.controller';

export const labelRouter = Router({ mergeParams: true });

labelRouter.get('/', getLabels);
labelRouter.get('/:labelId', getLabel);
labelRouter.post('/', createLabel);
