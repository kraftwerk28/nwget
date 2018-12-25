export interface Data {
  data: string | Buffer,
  interruptOffset?: number,
  dataType?: string,
  httpHeaders?: { [header: string]: string }
}

export interface GetOptions {
  protocol: string,
  url: string,
  headers: { [headerName: string]: string },
  pipe?: boolean,
  filename: string,
  directory?: string,
  continuable?: boolean,
}

export interface Get {
  (options: GetOptions): Promise<void>,
}
