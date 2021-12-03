import { Router } from 'express';
import { getWeatherData } from '../controller/weather.controller';

export const weatherRouter = Router({ mergeParams: true });

weatherRouter.get('/:date', getWeatherData);