#!/usr/bin/node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("./lib/http"));
const ftp_1 = __importDefault(require("./lib/ftp"));
const yargs_1 = __importDefault(require("yargs"));
const argParser_1 = __importDefault(require("./lib/argParser"));
const args = yargs_1.default
    .alias('u', 'url')
    .alias('p', 'pipe')
    .alias('c', 'continuable')
    .alias('o', 'out')
    .alias('d', 'out-dir')
    .alias('P', 'proxy')
    .argv;
console.log('Arguments: ');
const options = argParser_1.default(args);
if (options.protocol === 'ftp') {
    ftp_1.default(options);
}
else {
    http_1.default(options);
}
//# sourceMappingURL=index.js.map