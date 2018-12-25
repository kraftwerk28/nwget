/// <reference types="node" />
import { IncomingMessage } from 'http';
export default function (url: string, callback: (res: IncomingMessage) => void): void;
