import { get } from 'https';
import { IncomingMessage } from 'http';

export default function (
  url: string,
  callback: (res: IncomingMessage) => void): void {

  get(url, callback);
}
