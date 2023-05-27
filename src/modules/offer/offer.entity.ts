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
  @prop({
    required: true,
    type: Object,
  })
  public city!: City;

  @prop({
    required: true,
    type: Number,
  })
  public commentCount!: number;

  @prop({
    maxLength: OfferDescription.MaxLength,
    minLength: OfferDescription.MinLength,
    required: true,
    type: String,
  })
  public description!: string;

  @prop({
    default: [],
    required: true,
    type: Array,
  })
  public features!: OfferFeatures;

  @prop({
    required: true,
    type: Object,
  })
  public host!: User;

  @prop({
    default: false,
    required: true,
    type: Boolean,
  })
  public isPremium!: boolean;

  @prop({
    required: true,
    type: Object,
  })
  public location!: Location;

  @prop({
    max: OfferGuestCount.Max,
    min: OfferGuestCount.Min,
    required: true,
    type: Number,
  })
  public maxGuestCount!: number;

  @prop({
    default: [],
    required: true,
    type: Array,
  })
  public photoPaths!: string[];

  @prop({
    default: '',
    required: true,
    type: String,
  })
  public previewPath!: string;

  @prop({
    max: OfferPrice.Max,
    min: OfferPrice.Min,
    required: true,
    type: Number,
  })
  public price!: number;

  @prop({
    required: true,
    type: Date,
  })
  public publicationDate!: Date;

  @prop({
    max: OfferRating.Max,
    min: OfferRating.Min,
    required: true,
    type: Number,
  })
  public rating!: number;

  @prop({
    max: OfferRoomCount.Max,
    min: OfferRoomCount.Min,
    required: true,
    type: Number,
  })
  public roomCount!: number;

  @prop({
    maxLength: OfferTitle.MaxLength,
    minLength: OfferTitle.MinLength,
    required: true,
    type: String,
  })
  public title!: string;

  @prop({
    equired: true,
    type: String, // TODO narrow it later
  })
  public type!: OfferType;
}

export const OfferModel = getModelForClass(OfferEntity);
