#!/usr/bin/node
import http from './lib/http';
import ftp from './lib/ftp';
import yargs from 'yargs';
import { GetOptions } from './lib/getInterfaces';
import parseArgs from './lib/argParser';

const args = yargs
  .alias('u', 'url')
  .alias('p', 'pipe')
  .alias('c', 'continuable')
  .alias('o', 'out')
  .alias('d', 'out-dir')
  .alias('P', 'proxy')
  .argv;

console.log('Arguments: ');
// console.table(args);

const options: GetOptions = parseArgs(args);

if (options.protocol === 'ftp') {
  ftp(options);
} else {
  http(options);
}
