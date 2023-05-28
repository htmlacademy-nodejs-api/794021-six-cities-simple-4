import { Location } from '../../../types/location.type';
import { OfferFeatures } from '../../../types/offer-features.type';
import { OfferType } from '../../../types/offer-type.type';


export default class CreateOfferDto {
  public city!: string;
  public commentCount!: number;
  public description!: string;
  public features!: OfferFeatures;
  public host!: string;
  public isPremium!: boolean;
  public location!: Location;
  public maxGuestCount!: number;
  public photoPaths!: string[];
  public previewPath!: string;
  public price!: number;
  public publicationDate!: Date;
  public rating!: number;
  public roomCount!: number;
  public title!: string;
  public type!: OfferType;
}
