import { IncomingMessage } from 'http';

export interface Data {
  data: string | Buffer,
}

export interface GetOptions {

}

export const dataExtractor =
  async (response: IncomingMessage): Promise<string> =>
    new Promise<string>((resolve, reject) => {
      const data: Array<any> = [];
      response.on('data', (chunk) => {
        data.push(chunk);
      });
      response.on('end', () => {
        resolve(data.join(''));
      });
      response.on('error', (err) => {
        reject(err);
      });
    });

export default interface Get {
  (url: string, options?: GetOptions): Promise<Data>,
}
