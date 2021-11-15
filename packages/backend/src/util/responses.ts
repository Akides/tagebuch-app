import { Response } from 'express';

export function send404(res: Response): void {
    res.status(404).send({
        status: 'not_found'
    });
}

export function send202(res: Response): void {
    res.status(202).send({
        status: 'no_content / resource_already_exists'
    });
}