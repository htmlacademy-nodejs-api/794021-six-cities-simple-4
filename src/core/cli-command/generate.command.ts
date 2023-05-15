import got from 'got';
import { CliCommandInterface } from './cli-command.interface.js';
import OfferGenerator from '../../modules/offer-generator/offer-generator.js';
import TSVFileWriter from '../file-writer/tsv-file-writer.js';
import { MockData } from '../../types/mock-data.type.js';


export default class GenerateCommand implements CliCommandInterface {
  public readonly name = '--generate';
  private initialOfferData!: MockData;


  public async execute(...parameters: string[]): Promise<void> {
    const [ count, filepath, url ] = parameters;
    const offerCount = Number.parseInt(count, 10);

    try {
      this.initialOfferData = await got.get(url).json();
    } catch {
      console.error(`Could not fetch data from ${url}.`);
      return;
    }

    const offerGeneratorString = new OfferGenerator(this.initialOfferData);
    const tsvFileWriter = new TSVFileWriter(filepath);

    for (let i = 0; i < offerCount; i++) {
      await tsvFileWriter.write(offerGeneratorString.generate());
    }

    console.log(`File ${filepath} was created!`);
  }

}
