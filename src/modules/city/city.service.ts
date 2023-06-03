import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { CityServiceInterface } from './city-service.interface';
import { CityEntity } from './city.entity';
import CreateCityDto from './dto/create-city.dto';
import { ApplicationComponent } from '../../types/application-component.enum.js';


@injectable()
export default class CityService implements CityServiceInterface {
  constructor(
    @inject(ApplicationComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(ApplicationComponent.CityModel) private readonly cityModel: types.ModelType<CityEntity>,
  ) {}


  public async create(dto: CreateCityDto): Promise<DocumentType<CityEntity>> {
    const service = await this.cityModel.create(dto);
    this.logger.info(`New city created: ${dto.name}`);

    return service;
  }


  public async findByName(name: string): Promise<DocumentType<CityEntity> | null> {
    return this.cityModel.findOne({ name }).exec();
  }


  public async findOrCreate(dto: CreateCityDto): Promise<DocumentType<CityEntity>> {
    const existedCity = await this.findByName(dto.name);

    if (existedCity) {
      return existedCity;
    }

    return this.create(dto);
  }

}
