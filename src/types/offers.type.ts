import { City } from './city.type.js';
import { Location } from './location.type.js';
import { OfferType } from './offer-type.type.js';
import { OfferFeatures } from './offer-features.type.js';
import { User } from './user.type.js';

export type Offer = { // TODO sorted alphabetically?
  title: string;
  description: string;
  publicationDate: Date;
  city: City;
  previewPath: string;
  photoPaths: string[];
  isPremium: boolean;
  rating: number;
  type: OfferType;
  roomCount: number;
  maxGuestCount: number;
  price: number;
  features: OfferFeatures;
  host: User;
  commentCount: number;
  location: Location;
}

export type Offers = Offer[]
