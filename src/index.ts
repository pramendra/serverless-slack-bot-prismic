/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import express from 'express';
// const gql = require('graphql-tag');
import { query } from './lib/prismic';
import { lastPublishedQuery } from './gql/prismicQuery';

const routeMain = express.Router({});

routeMain.get('/', function (req: any, res: any) {
  res.status(200).send('Hello World!');
});

routeMain.post('/webhook', async (req: any, res: any) => {
  const { PRISMIC_WEBHOOK_SECRET = '' } = process.env;
  const { secret = '' } = res.body || {};
  if (secret && secret !== PRISMIC_WEBHOOK_SECRET) {
    res.status(403).send('permission denied');
    return;
  }
  // fetch last update timestamp

  // create timestamp
  const { totalCount = 0, edges = [] } = await query(lastPublishedQuery, {
    lastPublicationDate_after: '2020-06-13T02:26:27+0000',
  });
  console.log(totalCount, edges);
  // send notification
  // post to slack
  // update last update timestamp

  res.status(200).send('webhook');
});

export const http = routeMain;

exports.event = (event: any, callback: any) => {
  callback();
};
