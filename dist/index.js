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
const nwget_1 = __importDefault(require("./lib/nwget"));
exports.get = nwget_1.default;
const collectBody = (res) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        let body = '';
        res.on('data', chunk => { body += chunk; });
        res.on('end', () => { resolve(body); });
        res.on('error', err => { reject(err); });
    });
});
nwget_1.default('https://api.github.com/gists/e0e648a1c24c9f36c8fb876f53a8a4db', (res) => __awaiter(this, void 0, void 0, function* () {
    const result = yield collectBody(res);
    console.log(result);
}));
//# sourceMappingURL=index.js.map