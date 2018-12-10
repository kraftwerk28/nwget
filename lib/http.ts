import Get, { Data, GetOptions, dataExtractor } from './get';
import http from 'http';

// let httpGet: Get;
const httpGet: Get = (url: string, options?: GetOptions) =>
  new Promise<Data>((resolve, reject) => {
    http.get(url, async (res) => {
      const data = await dataExtractor(res);
      resolve({ data });
    });
  });

export default httpGet;
