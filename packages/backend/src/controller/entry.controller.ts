import { Request, Response } from 'express';
import { getConnection, getRepository } from "typeorm";
import { Entry } from "../entity/entry";
import { Label } from '../entity/label';
import { send202, send404 } from '../util/responses';
//import { Parser } from 'json2csv';

export const createEntry = async (req: Request, res: Response) => {
  const entry = new Entry();
  const entryRepository = getRepository(Entry);
  entry.title = req.body.title;
  entry.date = req.body.date;
  entry.content = req.body.content;
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
  
    const entryRepository = getRepository(Entry);
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



export const getEntriesSorted = async (_:Request, res: Response) => {
  
  const entryRepository = getRepository(Entry);
  try {
      const entries = await entryRepository.createQueryBuilder("entry")
      .leftJoinAndSelect("entry.labels", "label")
      .orderBy('entry.date', 'ASC')
      .getMany();


      res.send({
          data: entries,
      });
  } catch (error) {
      send404(res);
  }
}


export const getEntriesByInput = async (req:Request, res: Response) => {
  const input = req.params.input;

  const entryRepository = getRepository(Entry);
  try {
      const entries = await entryRepository.createQueryBuilder("entry")
      .leftJoinAndSelect("entry.labels", "label")
      .where('entry.content LIKE :input', {input: '%' + input + '%'})
      .orderBy('entry.date', 'ASC')
      .getMany();
      res.send({
          data: entries,
      });
  } catch (error) {
      send404(res);
  }
}

export const getEntriesByLabel = async (req:Request, res: Response) => {
  const input = req.params.input;

  const entryRepository = getRepository(Entry);
  try {
      const entries = await entryRepository.createQueryBuilder("entry")
      .leftJoinAndSelect("entry.labels", "label")
      .where('entry.content LIKE :input', {input: '%' + input + '%'})
      .orderBy('entry.date', 'ASC')
      .getMany();
      res.send({
          data: entries
      });
  } catch (error) {
      send404(res);
  }
}

export const getEntriesByDate = async (req:Request, res: Response) => {
  const input = req.params.input;
  console.log(input)

  const entryRepository = getRepository(Entry);
  try {
      const entries = await entryRepository.createQueryBuilder("entry")
      .leftJoinAndSelect("entry.labels", "label")
      .where('entry.date LIKE :input', {input: '%' + input + '%'})
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
    const entryRepository = getRepository(Entry);

    try {
      const entry = await entryRepository.createQueryBuilder("entry")
      .leftJoinAndSelect("entry.labels", "label")
      .where("entry.id = :id", { id: entryId })
      .getOneOrFail();
        res.send({
            data: entry
        });
    } catch (error) {
        send404(res);
    }
}

export const deleteEntry = async (req:Request, res: Response) => {
    const entryId = req.params.entryId;
    const entryRepository = getRepository(Entry);
  
    try {
      //console.log(entryId);
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
  
    const entryRepository = getRepository(Entry);
  
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
    const entryRepository = getRepository(Entry);
    const labelRepository = getRepository(Label);

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

    const entryRepository = getRepository(Entry);
    const labelRepository = getRepository(Label);

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
    const entryRepository = getRepository(Entry);

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

    const entryRepository = getRepository(Entry);
    const labelRepository = getRepository(Label);

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

  export async function getEntriesCSV(_: Request, res: Response) {
    const entryRepository = getRepository(Entry);
    try {
      const entries = await entryRepository.createQueryBuilder("entry")
      .leftJoinAndSelect("entry.labels", "label")
      .orderBy('entry.date', 'ASC')
      .getMany();

      console.log(entries);
      
      res.sendFile('./entries.csv');
    } catch (error) {
        send404(res);
    }
  }
