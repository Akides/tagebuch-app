import { Request, Response } from 'express';
import { getRepository } from "typeorm";
import { Label } from "../entity/label";
import { send404 } from '../util/responses';


//get specific label
export const getLabel = async (req: Request, res: Response) => {
    const labelId = req.params.labelId;
    const labelRepository = await getRepository(Label);

    try {         
        const label = await labelRepository.findOneOrFail(labelId);
        res.send({
            data: label,
        });
    } catch (e) {
        send404(res);
    }

};

//get all labels
export const getLabels = async (_: Request, res: Response) => {
    const labelRepository = await getRepository(Label);
    const labels = await labelRepository.find(); //load all transactions
    res.send({
        data: labels,
    });
};

//create new label
export const createLabel = async (req: Request, res: Response) => {
    const label = new Label();
    label.name = req.body.name;
    label.color = req.body.color;

    const labelRepository = await getRepository(Label);

    try {
      const createdLabel = await labelRepository.save(label);

      res.send({
        data: createdLabel
      });
    } catch (error) {
      send404(res);
    }
};

export const deleteLabel = async (req:Request, res: Response) => {
  const labelId = req.params.labelId;
  const labelRepository = await getRepository(Label);

  try {
    const label = await labelRepository.findOneOrFail(labelId);
    await labelRepository.remove(label);
    res.send({});
  } catch (error) {
    send404(res);
  }
};

export const patchLabel = async (req:Request, res: Response) => {
  const labelId = req.params.labelId;
  const name = req.body.name;
  const color = req.body.color;

  const labelRepository = await getRepository(Label);

  try {
    const label = await labelRepository.findOneOrFail(labelId);
    label.name = name;
    label.color = color;
    await labelRepository.save(label);
    res.send({
      data: label
    });
  } catch (error) {
    send404(res);
  }
}