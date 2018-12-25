import _ftp from 'ftp';
import { Data, GetOptions } from './getInterfaces';

let ftp = new _ftp();

export const createFTPClient = () => {
  ftp = new _ftp();
}

const get = (url: string, opts: GetOptions): Promise<Data> =>
  new Promise<Data>((resolve, reject) => {

  });

export default (opts: GetOptions): Promise<void> =>
  new Promise<void>((resolve, reject) => {

  });

