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
    this.logger.info(`Created offer with id: ${service._id}`);
    return service;
  }


  public async delete(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.model.
      findByIdAndDelete(offerId).
      exec();
  }


  private async updateCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    this.logger.info(`Updating comment count for offer with id: ${offerId}`);
    const foundComments = await this.model.findById(offerId, {
      $pipeline: [
        {
          $lookup: {
            from: 'comments',
            localField: '_id',
            foreignField: 'offerId',
            as: 'comments',
            pipeline: [
              { $match: { $expr: { $eq: ['$offerId', '$$offerId'] } } },
              { $project: { _id: true }}
            ],
          }
        },
        {
          $set: { newCommentCount: { $size: 'comments' } }
        },
        {
          $unset: 'comments',
        }
      ]}).exec();

    this.logger.info(`Set "newCommentCount" in: ${foundComments}`);
    return this.model
      .findByIdAndUpdate(offerId, {
        $pipeline: [
          {
            $lookup:
              {
                from: 'comments',
                localField: '_id',
                foreignField: 'offerId',
                as: 'comments',
                pipeline: [
                  { $match: { $expr: { $eq: ['$offerId', '$$offerId'] } } },
                  { $project: { _id: true }}
                ],
              },
          },
          { $set: { commentCount: { $size: 'comments' } } },
          { $unset: 'comments' },
        ],
      }).exec();
  }


  public async update(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    this.model.
      findByIdAndUpdate(offerId, dto, { new: true }).
      exec();

    return this.updateWithCommentChange(offerId);
  }


  private async updateRating(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    this.logger.info(`Updating rating for offer with id: ${offerId}`);
    return this.model.
      findByIdAndUpdate(offerId, {
        $pipeline: [
          {
            $lookup: {
              from: 'comments',
              localField: '_id',
              foreignField: 'offerId',
              let: { offerId: '$_id'},
              pipeline: [
                { $match: { $expr: { $eq: ['$offerId', '$$offerId'] } } },
                { $project: { _id: false, raiting: true }}
              ],
              as: 'raitings',
            },
          },
          {
            $set: { rating: { $avg: '$rating' } },
          },
          {
            $unset: '$raitings',
          },
        ]
      },
      ).
      exec();
  }


  public async updateWithCommentChange(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    await this.updateCommentCount(offerId);
    await this.updateRating(offerId);

    return this.model.
      findById(offerId).
      exec();
  }

}
