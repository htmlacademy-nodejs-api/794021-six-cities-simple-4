import typegoose, { Ref, defaultClasses, getModelForClass } from '@typegoose/typegoose';
import { OfferDescription, OfferGuestCount, OfferPrice, OfferRating, OfferRoomCount, OfferTitle } from '../../consts/offers.js';
import { OfferFeatures } from '../../types/offer-features.type.js';
import { Location } from '../../types/location.type.js';
import { OfferType } from '../../types/offer-type.type.js';
import { UserEntity } from '../user/user.entity.js';
import { CityEntity } from '../city/city.entity.js';

const { prop, modelOptions } = typegoose;

export interface OfferEntity extends defaultClasses.Base {
}


@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({
    _id: false,
    ref: CityEntity,
    required: true,
    type: Object,
  })
  public city!: Ref<CityEntity>;

  @prop({
    default: 0,
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
    _id: false,
    ref: UserEntity,
    required: true,
  })
  public host!: Ref<UserEntity>;

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
    required: true,
    type: String, // TODO narrow it down to 'OfferType'
  })
  public type!: OfferType;
}

export const OfferModel = getModelForClass(OfferEntity);
