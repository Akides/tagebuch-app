import { getRepository } from "typeorm";
import {Request, Response} from "express";
import { Day } from "../entity/day"
import { send404 } from "../util/responses";


export const createDay = async (req: Request, res: Response) => {
    
    
    const day = new Day();
    day.date = req.body.date;
    day.weekday = req.body.weekday;
    const dayRepository = getRepository(Day);

    try {
        const createdDay = await dayRepository.save(day);
        res.send({
            data: createdDay
          });
    } catch (error) {
        send404(res);
    }

}