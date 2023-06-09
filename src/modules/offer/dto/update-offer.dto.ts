import { Location } from '../../../types/location.type';
import { OfferFeatures } from '../../../types/offer-features.type';
import { OfferType } from '../../../types/offer-type.type';


export default class UpdateOfferDto {
  public city!: string;
  public description!: string;
  public features!: OfferFeatures;
  public isPremium!: boolean; // TODO The service should decide it, not the host? Think of it later
  public location!: Location;
  public maxGuestCount!: number;
  public photoPaths!: string[];
  public previewPath!: string;
  public price!: number;
  public roomCount!: number;
  public title!: string;
  public type!: OfferType;
}
