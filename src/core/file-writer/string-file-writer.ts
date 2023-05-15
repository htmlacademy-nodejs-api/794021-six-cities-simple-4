import { createWriteStream, WriteStream } from 'node:fs';
import { FileWriterInterface } from './file-writer.interface.js';
import { FileOperations, StringFile } from '../../consts/files.js';


export default class StringFileWriter implements FileWriterInterface {
  private stream: WriteStream;


  constructor(public readonly filename: string) {
    this.stream = createWriteStream(this.filename, {
      flags: 'w',
      encoding: 'utf8',
      highWaterMark: FileOperations.WriteStreamChunkSizeInBytes,
      autoClose: true,
    });
  }


  public async write(row: string): Promise<void> {
    row = row.replaceAll(StringFile.LineSeparator, ' ');
    const isWritten = this.stream.write(`${row}${StringFile.LineSeparator}`);

    if (!isWritten) {
      return new Promise((resolve) => {
        this.stream.once('drain', () => resolve());
      });
    }
    return Promise.resolve();
  }
}
