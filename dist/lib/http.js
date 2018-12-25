"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const fs_1 = __importDefault(require("fs"));
const defReqOptions = {
    method: 'GET',
    headers: {},
};
const defGetOpts = {
    protocol: 'http',
    directory: '.',
    filename: 'nwget_response',
    headers: {},
    pipe: false,
    url: '',
    continuable: false,
};
const isBinary = (contentType) => {
    if (!contentType)
        return false;
    return !(/^(text|application)\//i.test(contentType));
};
const core = (opts, resp) => (resolve, reject) => {
    console.log('Url: ' + opts.url);
    const data = [];
    console.log('Status: ' + resp.statusCode + (resp.statusCode === 200 ? ' OK' : ''));
    if (resp.statusCode === 302) {
        if (!resp.headers.location) {
            reject('Wrong 302 header got. Aborting.');
            return;
        }
        client(Object.assign({}, opts, { filename: resp.headers.location }));
    }
    if (opts.pipe) {
        const tempName = opts.filename.replace(/\.$/, '') + '.nwgettmp';
        const fsstream = fs_1.default.createWriteStream(tempName);
        let chunkCnt = 0;
        resp.on('data', chunk => {
            chunkCnt++;
            console.log('Chunk #' + chunkCnt);
            console.log(chunk);
            fsstream.write(chunk);
        });
        resp.on('end', () => {
            fsstream.close();
            fs_1.default.renameSync(tempName, opts.filename);
        });
        resolve();
    }
    else {
        resp.on('data', (chunk) => {
            data.push(chunk);
        });
        resp.on('end', () => {
            console.log('Data: ' + data);
            if (isBinary(resp.headers['content-type']))
                fs_1.default.writeFileSync(opts.filename, new Buffer(data));
            else
                fs_1.default.writeFileSync(opts.filename, data.join(''));
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
const responseCallback = (opts, resolve, reject) => (res) => {
    dataExtractor(opts, res)
        .then(() => resolve())
        .catch(err => reject(err));
};
const dataExtractor = (opts, response) => __awaiter(this, void 0, void 0, function* () { return new Promise(core(opts, response)); });
const http = (opts) => new Promise((resolve, reject) => {
    console.log('Using http...');
    http_1.default.get(opts.url, Object.assign({}, defReqOptions, opts), responseCallback(opts, resolve, reject));
});
const https = (opts) => new Promise((resolve, reject) => {
    console.log('Using https...');
    https_1.default.get(opts.url, Object.assign({}, defReqOptions, opts), responseCallback(opts, resolve, reject));
});
const client = (opts) => opts.protocol.startsWith('https') ?
    https(opts) :
    http(opts);
exports.default = client;
//# sourceMappingURL=http.js.map