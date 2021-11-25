import { Request, Response } from 'express';
import { getConnection, getRepository } from "typeorm";
import { Entry } from "../entity/entry";
import { Label } from '../entity/label';
import { send202, send404 } from '../util/responses';

export const createEntry = async (req: Request, res: Response) => {
  /*
  const dayRepository = await getRepository(Day);
  const day = await dayRepository.findOne(req.body.date);
  console.log(day);
  if (day == null) {
    console.log("TEEEEEEEEEEE");
    const day = new Day();
    day.date = req.body.date;
    day.weekday = req.body.weekday;
    try {
      await dayRepository.save(day);
    } catch (error) {
        send404(res);
    }
  }
  */

  const entry = new Entry();
  const entryRepository = await getRepository(Entry);
  entry.title = req.body.title;
  entry.date = req.body.date;
  entry.content = req.body.content;
  entry.weekday = req.body.weekday;
  try {
    const createdEntry = await entryRepository.save(entry).catch((error) => {
      console.error(error);
    });
    res.send({
      data: createdEntry
    });
  } catch (error) {
      send404(res);
  }
}

export const getEntries = async (_:Request, res: Response) => {
  
    const entryRepository = await getRepository(Entry);
    try {
        const entries = await entryRepository.createQueryBuilder("entry")
        .leftJoinAndSelect("entry.labels", "label")
        .getMany();
        res.send({
            data: entries,
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
    const date = req.body.date;
  
    const entryRepository = await getRepository(Entry);
  
    try {
      const entry = await entryRepository.findOneOrFail(entryId);
      entry.title = title;
      entry.content = content;
      entry.imgURL = imgURL;
      entry.date = date;  //foreign key
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

  
  export const addLabel = async (req: Request, res: Response) => {
    const labelId = req.params.labelId;
    const entryId = req.params.entryId;
    console.log(labelId);
    console.log(entryId);
    const entryRepository = await getRepository(Entry);
    const labelRepository = await getRepository(Label);

    try {
      const entry = await entryRepository.findOneOrFail(entryId);
      const label = await labelRepository.findOneOrFail(labelId);
      try {
        await getConnection().createQueryBuilder().relation(Entry, "labels").of(entry).add(label);
      } catch (error) {
        send202(res);
      }
      res.send({
        data: entry
      });
    } catch (error) {
      send404(res);
    }
  }

  
  export const removeLabel = async (req: Request, res: Response) => {
    const labelId = req.params.labelId;
    const entryId = req.params.entryId;

    const entryRepository = await getRepository(Entry);
    const labelRepository = await getRepository(Label);

    try {
      const entry = await entryRepository.findOneOrFail(entryId);
      const label = await labelRepository.findOneOrFail(labelId);
      try {
        await getConnection().createQueryBuilder().relation(Entry, "labels").of(entry).remove(label);
      } catch (error) {
        send202(res);
      }
      res.send({
        data: entry
      });
    } catch (error) {
      send404(res);
    }
  }
  

  export const getLabels = async (req: Request, res: Response) => {
    const entryId = req.params.req;
    const entryRepository = await getRepository(Entry);

    try {
       const entry = await entryRepository.findOneOrFail(entryId);
      try {
        const labels = await getConnection().createQueryBuilder().relation(Entry, "labels").of(entry).loadMany();

        res.send({
          data: labels
        });
      } catch (error) {
        send202(res);
      }
    } catch (error) {
      send404(res);
    } 
  }

  export async function processLabel(mode: string, req: Request, res: Response) {
    const labelId = req.params.labelId;
    const entryId = req.params.entryId;

    const entryRepository = await getRepository(Entry);
    const labelRepository = await getRepository(Label);

    try {
      const entry = await entryRepository.findOneOrFail(entryId);
      const label = await labelRepository.findOneOrFail(labelId);
      try {
        const rel = getConnection().createQueryBuilder().relation(Entry, "labels").of(entry)
        switch (mode) {
          case 'addLabel':
            await rel.add(label);
            break;
          case 'removeLabel':
            await rel.remove(label);
            break;
          default:
            break;
        }
      } catch (error) {
        send202(res);
      }
      res.send({
        data: entry
      });
    } catch (error) {
      send404(res);
    }
  }
