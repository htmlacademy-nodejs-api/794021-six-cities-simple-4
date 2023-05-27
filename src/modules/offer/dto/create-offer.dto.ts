import { City } from '../../../types/city.type';
import { Location } from '../../../types/location.type';
import { OfferFeatures } from '../../../types/offer-features.type';
import { OfferType } from '../../../types/offer-type.type';
import { Offer } from '../../../types/offers.type';
import { User } from '../../../types/user.type';


export default class CreateOfferDto implements Offer {
  public city!: City;
  public commentCount!: number;
  public description!: string;
  public features!: OfferFeatures;
  public host!: User; // TODO should it be simply hostId ?
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
