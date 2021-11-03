import { Request, Response } from 'express';
import { getRepository } from "typeorm";
import { Entry } from "../entity/entry";
import { send404 } from '../util/responses';

export const createEntry = async (req: Request, res: Response) => {
    const entry = new Entry();
    const entryRepository = await getRepository(Entry);
    entry.title = req.body.title;
    try {
      const createdLabel = await entryRepository.save(entry);

      res.send({
        data: createdLabel
      });
    } catch (error) {
        send404(res);
    }
}

export const getEntries = async (_:Request, res: Response) => {
    const entryRepository = await getRepository(Entry);
    try {
        const entries = await entryRepository.find();
        res.send({
            data: entries
        });
    } catch (error) {
        send404(res);
    }
}

export const getEntry = async (req: Request, res: Response) => {
    const entryId = req.params.entryId;
    const entryRepository = await getRepository(Entry);

    try {
        const entry = entryRepository.findOneOrFail(entryId);
        res.send({
            data: entry
        });
    } catch (error) {
        send404(res);
    }
}

