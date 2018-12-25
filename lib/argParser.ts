import { GetOptions } from './getInterfaces';
import { Arguments } from 'yargs';

const abort = (msg: string): never => {
  throw new Error(`${msg}. Aborting.`);
}

const parseArgs = (args: Arguments): GetOptions => {
  const res: GetOptions = <GetOptions>{};

  if (!args['url']) {
    abort('Parameter --url must be specified');
  }

  res.url = args['url'];
  const urlmatch = res.url.match(/(https?|ftp):/);
  if (urlmatch) {
    res.protocol = urlmatch[0];
  } else {
    res.protocol = 'http';
  }

  if (args['out']) {
    res.filename = args['out'];
  } else {
    let fname = res.url.match(/\/(\w+)$/);
    if (!fname) {
      fname = res.url.match(/:\/\/(\w+)\./);
    }
    console.log(fname);
    if (fname) {
      res.filename = fname[1];
    }
  }

  if (args['pipe']) {
    res.pipe = true;
    res.filename = args['out'];
  }
  if (res.continuable && !res.pipe) {
    abort('Safe download is able only with --pipe option');
  }

  if (args['out-dir']) {
    res.directory = args['out-dir'];
  } else {
    res.directory = '';
  }
  console.table(res);
  return res as GetOptions;
};

export default parseArgs;
