/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
exports.http = (request: any, response: any) => {
  response.status(200).send('Hello World!');
};

exports.event = (event: any, callback: any) => {
  callback();
};