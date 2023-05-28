import { createReadStream } from 'node:fs';
import { EventEmitter } from 'node:events';
import { FileReaderInterface } from './file-reader.interface.js';
import { FileOperations, StringFile } from '../../consts/files.js';


export default class StringFileReader extends EventEmitter implements FileReaderInterface {
  constructor(public filename: string) {
    super();
  }


  public async read(): Promise<void> {
    const stream = createReadStream(this.filename, {
      autoClose: true,
      emitClose: true,
      flags: 'r',
      highWaterMark: FileOperations.ReadStreamChunkSizeInBytes,
      encoding: 'utf-8',
    });

    let stringBuffer = '';
    let nextLinePosition = -1;
    let fullRowCount = 0;

    for await (const chunk of stream) {
      stringBuffer += chunk.toString();

      while ((nextLinePosition = stringBuffer.indexOf(StringFile.LineSeparator)) >= 0) {
        const row = stringBuffer.slice(0, nextLinePosition + 1);
        stringBuffer = stringBuffer.slice(++nextLinePosition);
        fullRowCount++;

        await new Promise((resolve) => {
          this.emit('row', row, resolve);
        });
      }
    }

    this.emit('end', fullRowCount);
  }
}
