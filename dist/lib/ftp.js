"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ftp_1 = __importDefault(require("ftp"));
let ftp = new ftp_1.default();
exports.createFTPClient = () => {
    ftp = new ftp_1.default();
};
const get = (url, opts) => new Promise((resolve, reject) => {
});
exports.default = (opts) => new Promise((resolve, reject) => {
});
//# sourceMappingURL=ftp.js.map