import get from './lib/nwget';
import { IncomingMessage } from 'http';

const collectBody = async (res: IncomingMessage): Promise<string> =>
  new Promise<string>((resolve, reject) => {
    let body: string = '';
    res.on('data', chunk => { body += chunk });
    res.on('end', () => { resolve(body) });
    res.on('error', err => { reject(err) });
  })

get(
  'https://api.github.com/gists/e0e648a1c24c9f36c8fb876f53a8a4db',
  async res => {
    const result = await collectBody(res);
    console.log(result);
  }
);

export { get };
