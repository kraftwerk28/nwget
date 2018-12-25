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
const responseCallback = (resolve, reject) => (res) => {
    dataExtractor(res)
        .then(d => resolve({ data: d }))
        .catch(err => reject(err));
};
const defOptions = {};
const dataExtractor = (response) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const data = [];
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
});
exports.http = (url, opts) => new Promise((resolve, reject) => {
    http_1.default.get(url, Object.assign({}, defOptions, opts), responseCallback(resolve, reject));
});
exports.https = (url, opts) => new Promise((resolve, reject) => {
    https_1.default.get(url, Object.assign({}, defOptions, opts), responseCallback(resolve, reject));
});
//# sourceMappingURL=get.js.map