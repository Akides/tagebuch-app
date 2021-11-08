import { Request, Response } from 'express';
import { getConnection, getRepository } from "typeorm";
import { Entry } from "../entity/entry";
import { Label } from '../entity/label';
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
        const entry = await entryRepository.findOneOrFail(entryId);
        res.send({
            data: entry
        });
    } catch (error) {
        send404(res);
    }
}

export const deleteEntry = async (req:Request, res: Response) => {
    const entryId = req.params.labelId;
    const entryRepository = await getRepository(Entry);
  
    try {
      const entry = await entryRepository.findOneOrFail(entryId);
      await entryRepository.remove(entry);
      res.send({});
    } catch (error) {
      send404(res);
    }
  };
  
  export const patchEntry = async (req: Request, res: Response) => {
    const entryId = req.params.entryId;
    const title = req.body.title;
    const content = req.body.content;
    const imgURL = req.body.imgURL;
    const day = req.body.day;
  
    const entryRepository = await getRepository(Entry);
  
    try {
      const entry = await entryRepository.findOneOrFail(entryId);
      entry.title = title;
      entry.content = content;
      entry.imgURL = imgURL;
      entry.day = day;  //foreign key
      try {
          await entryRepository.save(entry);
      } catch (error) {
          console.log(error);
      }
      res.send({
        data: entry
      });
    } catch (error) {
      send404(res);
    }
  }

  /*
  export const addLabel = async (req: Request, res: Response) => {
      const labelId = req.params.labelId;
      const entryId = req.params.entryId;

      const entryRepository = await getRepository(Entry);
      const labelRepository = await getRepository(Label);


      try {
        const entry = await entryRepository.findOneOrFail(entryId);
        const label = await labelRepository.findOneOrFail(labelId);
        entry.labels.push(label);

        try {
          await entryRepository.save(entry);
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error)
        send404(res);
      }


      // localhost:3000/api/entry/addLabel/entryId/labelId

  }
*/

export const addLabel = async (req: Request, res: Response) => {
  const labelId = req.params.labelId;
  const entryId = req.params.entryId;

  const entryRepository = await getRepository(Entry);
  const labelRepository = await getRepository(Label);

  try {
    const entry = await entryRepository.findOneOrFail(entryId);
    const label = await labelRepository.findOneOrFail(labelId);
    await getConnection().createQueryBuilder().relation(Entry, "labels").of(entry).add(label);
    res.send({
      data: entry
    });
  } catch (error) {
    console.log(error);
    send404(res);
  }
}
