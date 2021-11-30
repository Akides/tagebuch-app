// eslint:disable-next-line: no-var-requires
require('dotenv-safe').config();
import 'reflect-metadata';
import express from 'express';
import { createDatabaseConnection } from './util/createDatabaseConnection';
import * as bodyParser from 'body-parser';
import { globalRouter } from './router/global.router';
const { Parser } = require('json2csv');

const port: number = Number(process.env.PORT);

export const startServer = async () => {
  try {

    const fields = ['field1', 'field2', 'field3'];
const opts = { fields };

try {
  const parser = new Parser(opts);
  const csv = parser.parse({data: "lol"});
  console.log(csv);
} catch (err) {
  console.error(err);
}

    const app = express();
    const dbConnection = await createDatabaseConnection();
    app.use(bodyParser.json());
    app.use('/api', globalRouter);


    const server = app.listen(port, () => console.log(`Server is running on port ${port}`));
    return { server, dbConnection };
  } catch (e) {
    console.log(e);
    throw e;
  }
};

// tslint:disable-next-line: no-floating-promises
startServer();
