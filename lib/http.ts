import { IncomingMessage } from 'http';
import _http, { RequestOptions } from 'http';
import _https from 'https';
import fs from 'fs';

import { GetOptions, Get, Data } from './getInterfaces';

const defReqOptions: RequestOptions = {
  method: 'GET',
  headers: {
  },
};

const defGetOpts: GetOptions = {
  protocol: 'http',
  directory: '.',
  filename: 'nwget_response',
  headers: {},
  pipe: false,
  url: '',
  continuable: false,
};

const isBinary = (contentType: string | undefined): boolean => {
  if (!contentType) return false;
  return !(/^(text|application)\//i.test(contentType));
};

const core = (opts: GetOptions, resp: IncomingMessage) =>
  (resolve: () => void, reject: (err: any) => void): void => {
    console.log('Url: ' + opts.url);
    const data: Array<any> = [];
    console.log('Status: ' + resp.statusCode + (resp.statusCode === 200 ? ' OK' : ''));
    if (resp.statusCode === 302) {
      if (!resp.headers.location) {
        reject('Wrong 302 header got. Aborting.');
        return;
      }

      client({ ...opts, filename: resp.headers.location, });
    }

    if (opts.pipe) {
      const tempName = opts.filename.replace(/\.$/, '') + '.nwgettmp';
      const fsstream = fs.createWriteStream(tempName);
      let chunkCnt = 0;
      resp.on('data', chunk => {
        chunkCnt++;
        console.log('Chunk #' + chunkCnt);
        console.log(chunk);
        fsstream.write(chunk);
      });
      resp.on('end', () => {
        fsstream.close();
        fs.renameSync(tempName, opts.filename);
      });

      // if (opts.continuable) {
      //   resp.on('error', () => {

      //   });
      // }

      resolve();

    } else {

      resp.on('data', (chunk) => {
        data.push(chunk);
      });
      resp.on('end', () => {
        console.log('Data: ' + data);
        if (isBinary(resp.headers['content-type']))
          fs.writeFileSync(opts.filename, new Buffer(data));
        else
          fs.writeFileSync(opts.filename, data.join(''));
        resolve();
        return;
      });
      resp.on('error', (err) => {
        if (opts.continuable) {

        }
        reject(err);
      });

    }

  };

const responseCallback =
  (opts: GetOptions, resolve: () => void, reject: (r: Error | any) => void):
    (r: IncomingMessage) => void =>
    (res: IncomingMessage): void => {
      dataExtractor(opts, res)
        .then(() => resolve())
        .catch(err => reject(err));
    };

const dataExtractor =
  async (opts: GetOptions, response: IncomingMessage) =>
    new Promise<void>(core(opts, response));

const http: Get =
  (opts: GetOptions): Promise<void> =>
    new Promise<void>((resolve, reject) => {
      console.log('Using http...');
      _http.get(
        opts.url,
        { ...defReqOptions, ...opts },
        responseCallback(opts, resolve, reject)
      );
    });

const https: Get =
  (opts: GetOptions): Promise<void> =>
    new Promise<void>((resolve, reject) => {
      console.log('Using https...');
      _https.get(
        opts.url,
        { ...defReqOptions, ...opts },
        responseCallback(opts, resolve, reject)
      )
    });

const client = (opts: GetOptions): Promise<void> =>
  opts.protocol.startsWith('https') ?
    https(opts) :
    http(opts);

export default client;
