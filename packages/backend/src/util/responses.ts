import { Response } from 'express';

export function send404(res: Response): void {
    res.status(404).send({
        status: 'not_found'
    });
}