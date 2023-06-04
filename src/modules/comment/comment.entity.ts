import typegoose, { defaultClasses, getModelForClass, Ref } from '@typegoose/typegoose';
import { OfferEntity } from '../offer/offer.entity.js';
import { UserEntity } from '../user/user.entity.js';

const { prop, modelOptions } = typegoose;

export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments',
  },
})
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({
    maxlength: CommentConstraint.textMaxLength,
    minlength: CommentConstraint.textMinLength,
    trim: true,
    required: true,
    type: String,
  })
  public text!: string;


  @prop({
    max: CommentConstraint.ratingMaxValue,
    min: CommentConstraint.ratingMinValue,
    required: true,
    type: Number,
  })
  public rating!: number;


  @prop({
    ref: OfferEntity,
    required: true,
  })
  public offerId!: Ref<OfferEntity>;


  @prop({
    ref: UserEntity,
    required: true,
  })
  public userId!: Ref<UserEntity>;

  // TODO should 'publicationDate' field be describet in this entity?
}

export const CommentModel = getModelForClass(CommentEntity);
