import { CliCommandInterface } from './cli-command.interface.js';
import StringFileReader from '../file-reader/string-file-reader.js';
import { OfferParser } from '../../modules/offer-parser/offer-parser.js';


export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';


  public async execute(filename: string): Promise<void> {
    const fileReader = new StringFileReader(filename.trim());

    fileReader.on('row', this.onRowReceive);
    fileReader.on('end', this.onEnd);

    try {
      await fileReader.read();
    } catch (err) {
      if (!(err instanceof Error)) {
        throw err;
      }
      console.error(`Could not import data from file due to reason: «${err.message}»`);
      throw err;
    }
  }


  private onEnd(count: number): void {
    console.log('Imported %d offers-lines.', count);
  }


  private onRowReceive(row: string): void {
    const parser = new OfferParser(row);
    const offer = parser.parse();
    console.log(`Offer imported:\n${JSON.stringify(offer, null, '\t')}`);
  }

}
