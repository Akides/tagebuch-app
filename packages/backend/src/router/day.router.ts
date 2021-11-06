import { Router } from "express";
import { createDay } from "../controller/day.controller";

export const dayRouter = Router({ mergeParams: true });
dayRouter.post('/', createDay);