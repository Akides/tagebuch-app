import { Request, Response } from 'express';
import { getRepository } from "typeorm";
import { Label } from "../entity/label";


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
        res.status(404).send({
            status: 'not_found',
        })
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

    const labelRepository = await getRepository(Label);

    try {
      const createdLabel = await labelRepository.save(label);

      res.send({
        data: createdLabel
      });
    } catch (error) {
      res.status(404).send({
        status: 'not_found',
      })
    }

};