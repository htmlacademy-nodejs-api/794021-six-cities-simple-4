import typegoose, { defaultClasses, getModelForClass } from '@typegoose/typegoose';
import { OfferDescription, OfferGuestCount, OfferPrice, OfferRating, OfferRoomCount, OfferTitle } from '../../consts/offers.js';
import { Offer } from '../../types/offers.type.js';
import { OfferFeatures } from '../../types/offer-features.type.js';
import { City } from '../../types/city.type.js';
import { Location } from '../../types/location.type.js';
import { OfferType } from '../../types/offer-type.type.js';
import { User } from '../../types/user.type.js';

const { prop, modelOptions } = typegoose;

export interface OfferEntity extends defaultClasses.Base {
}


@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
export class OfferEntity extends defaultClasses.TimeStamps implements Offer {
  @prop({ required: true })
  public city!: City;

  @prop({ required: true })
  public commentCount!: number;

  @prop({
    maxLength: OfferDescription.MaxLength,
    minLength: OfferDescription.MinLength,
    required: true
  })
  public description!: string;

  @prop({ required: true })
  public features!: OfferFeatures;

  @prop({ required: true })
  public host!: User;

  @prop({ required: true })
  public isPremium!: boolean;

  @prop({ required: true })
  public location!: Location;

  @prop({
    max: OfferGuestCount.Max,
    min: OfferGuestCount.Min,
    required: true,
  })
  public maxGuestCount!: number;

  @prop({ required: true })
  public photoPaths!: string[];

  @prop({ required: true })
  public previewPath!: string;

  @prop({
    max: OfferPrice.Max,
    min: OfferPrice.Min,
    required: true,
  })
  public price!: number;

  @prop({ required: true })
  public publicationDate!: Date;

  @prop({
    max: OfferRating.Max,
    min: OfferRating.Min,
    required: true
  })
  public rating!: number;

  @prop({
    max: OfferRoomCount.Max,
    min: OfferRoomCount.Min,
    required: true,
  })
  public roomCount!: number;

  @prop({
    maxLength: OfferTitle.MaxLength,
    minLength: OfferTitle.MinLength,
    required: true
  })
  public title!: string;

  @prop({ required: true })
  public type!: OfferType;
}

export const OfferModel = getModelForClass(OfferEntity);
