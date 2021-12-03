import { Request, Response } from "express"
import axios from "axios";
import { send404 } from "../util/responses";

export const getWeatherData = async (req: Request, res: Response) => {
    const date = req.params.date;
    const split = date.split('-');
    const woeid = '650272'; //fixed Frankfurt ID
    axios.get(`https://www.metaweather.com/api/location/${woeid}/${split[0]}/${split[1]}/${split[2]}/`)
    .then((response) => {
        const data = response.data;
        const size = Object.keys(data).length;
        if (size == 0) 
            send404(res);
        else{
            let sum = 0;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data.forEach((measure: any) => {
                if ('the_temp' in measure) {
                    sum = sum + measure["the_temp"]; 
                }
            });
            const mean = (sum / size).toFixed(2);
            res.send({
                celsius: mean
            });
        }
    })
    .catch(() => send404(res));
}