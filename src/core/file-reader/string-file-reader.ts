import { createReadStream } from 'node:fs';
import { EventEmitter } from 'node:events';
import { FileReaderInterface } from './file-reader.interface.js';

const CHUNK_SIZE_IN_BYTES = 64;
const LINE_SEPARATOR = '\n' as const;


export default class StringFileReader extends EventEmitter implements FileReaderInterface {
  constructor(public filename: string) {
    super();
  }


  public async read(): Promise<void> {
    const stream = createReadStream(this.filename, {
      autoClose: true,
      emitClose: true,
      flags: 'r',
      highWaterMark: CHUNK_SIZE_IN_BYTES,
      encoding: 'utf-8',
    });

    let stringBuffer = '';
    let nextLinePosition = -1;
    let fullRowCount = 0;

    for await (const chunk of stream) {
      stringBuffer += chunk.toString();

      while ((nextLinePosition = stringBuffer.indexOf(LINE_SEPARATOR)) >= 0) {
        const row = stringBuffer.slice(0, nextLinePosition + 1);
        stringBuffer = stringBuffer.slice(++nextLinePosition);
        fullRowCount++;

        this.emit('row', row);
      }
    }

    this.emit('end', fullRowCount);
  }
}
