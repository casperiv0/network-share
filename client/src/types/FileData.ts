export interface FileData {
  name: string;
  data: ArrayBuffer;
  size: number;
  encoding: string;
  tempFilePath: string;
  truncated: boolean;
  mimetype: string;
  md5: string;
}
