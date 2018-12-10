#!/usr/bin/node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("./lib/http"));
http_1.default('http://api.plos.org/search?q=title:DNA')
    .then((data) => {
    console.log(data);
});
// yargs
//   .usage('$0 <cmd> [args]')
//   .command('hello [name]', 'welcome ter yargs!',
//     (yargs: yargs.Argv): any => {
//       yargs
//       yargs.positional('name', {
//         type: 'string',
//         default: 'Cambi',
//         describe: 'the name to say hello to'
//       })
//     }, function (argv: yargs.Arguments) {
//       console.log('hello', argv.name, 'welcome to yargs!')
//     })
//   .help()
//   .argv
// const collectBody = async (res: IncomingMessage): Promise<string> =>
//   new Promise<string>((resolve, reject) => {
//     let body: string = '';
//     res.on('data', chunk => { body += chunk });
//     res.on('end', () => { resolve(body) });
//     res.on('error', err => { reject(err) });
//   })
// get(
//   'https://api.github.com/gists/e0e648a1c24c9f36c8fb876f53a8a4db',
//   async res => {
//     const result = await collectBody(res);
//     console.log(result);
//   }
// );
//# sourceMappingURL=index.js.map