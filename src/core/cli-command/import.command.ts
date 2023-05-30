import { exit } from 'node:process';
import { CliCommandInterface } from './cli-command.interface.js';
import StringFileReader from '../file-reader/string-file-reader.js';
import { OfferParser } from '../../modules/offer-parser/offer-parser.js';
import ConsoleLoggerService from '../logger/console.service.js';
import { LoggerInterface } from '../logger/logger.interface.js';
import { OfferModel } from '../../modules/offer/offer.entity.js';
import OfferService from '../../modules/offer/offer.service.js';
import { DatabaseClientInterface } from '../database-client/database-client.interface.js';
import { DatabaseClientService } from '../database-client/database-client.service.js';
import UserService from '../../modules/user/user.service.js';
import { UserModel } from '../../modules/user/user.entity.js';
import { UserServiceInterface } from '../../modules/user/user-service.interface.js';
import CityService from '../../modules/city/city.service.js';
import { CityModel } from '../../modules/city/city.entity.js';
import { CityServiceInterface } from '../../modules/city/city-service.interface.js';
import { getDatabaseURI } from '../helpers/database.js';
import { Offer } from '../../types/offers.type.js';
import { PlainFunction } from '../../types/common.js';


export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';
  private salt!: string;

  private cityService: CityServiceInterface;
  private databaseService: DatabaseClientInterface;
  private logger: LoggerInterface;
  private offerService: OfferService;
  private userService: UserServiceInterface;


  constructor() {
    this.onEnd = this.onEnd.bind(this);
    this.onRowReceive = this.onRowReceive.bind(this);

    this.logger = new ConsoleLoggerService();

    this.cityService = new CityService(this.logger, CityModel);
    this.databaseService = new DatabaseClientService(this.logger);
    this.offerService = new OfferService(this.logger, OfferModel);
    this.userService = new UserService(this.logger, UserModel);
  }


  public async execute(
    filename: string,
    databaseHost: string,
    databasePort: string,
    databaseLogin: string,
    databasePassword: string,
    databaseName: string,
    salt: string,
  ): Promise<void> {
    const uri = getDatabaseURI(databaseHost, databasePort, databaseLogin, databasePassword, databaseName);
    this.salt = salt;

    await this.databaseService.connect(uri);
    const fileReader = new StringFileReader(filename.trim());

    fileReader.on('row', this.onRowReceive);
    fileReader.on('end', this.onEnd);

    try {
      await fileReader.read();
    } catch (err) {
      if (!(err instanceof Error)) {
        throw err;
      }
      this.logger.error(`Could not import data from file due to reason: «${err.message}»`);
      exit(1);
    }
  }


  private onEnd(count: number): void {
    this.databaseService.disconnect();
    this.logger.info('Imported %d offers-lines.', count);
  }


  private async onRowReceive(row: string, resolve: PlainFunction) {
    const parser = new OfferParser(row);
    const offer = parser.parse();
    await this.saveOffer(offer);
    resolve();
  }


  private async saveOffer(offer: Offer) {
    const city = await this.cityService.findOrCreate(offer.city);

    const user = await this.userService.findOrCreate({
      ...offer.host,
    }, this.salt);

    await this.offerService.create({
      ...offer,
      city: city.id,
      host: user.id,
    });
  }

}
