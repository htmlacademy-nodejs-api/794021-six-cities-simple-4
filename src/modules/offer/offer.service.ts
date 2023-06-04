import { inject, injectable } from 'inversify';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import { OfferEntity } from './offer.entity.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { ApplicationComponent } from '../../types/application-component.enum.js';
import UpdateOfferDto from './dto/update-offer.dto.js';


@injectable()
export default class OfferService implements OfferServiceInterface {
  constructor(
    @inject(ApplicationComponent.LoggerInterface)
    private readonly logger: LoggerInterface,

    @inject(ApplicationComponent.OfferModel)
    private readonly model: ModelType<OfferEntity>,
  ) {
  }


  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const service = await this.model.create(dto);
    this.logger.info(`New offer created: ${dto.description}`);
    return service;
  }


  public async update(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.model.
      findByIdAndUpdate(offerId, dto, { new: true }).
      populate([ 'userId' ]).
      exec();
  }

}
