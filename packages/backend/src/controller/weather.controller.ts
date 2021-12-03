import { Request, Response } from "express"
import axios from "axios";

export const getWeatherData = async (_: Request, res: Response) => {
    const woeid = '650272'; //fixed Frankfurt ID
    axios.get(`https://www.metaweather.com/api/location/${woeid}/2020/7/12/`)
    .then((response) => {
        const data = response.data;
        const size = Object.keys(data).length;
        if (size == 0) {
            res.send({
                temperature: "NaN"
            });
        }
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
    .catch(() => res.send({
        celsius: "error"
    }));
}