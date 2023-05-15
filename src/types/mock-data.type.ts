import { OfferType } from './offer-type.type.js';
import { OfferFeatures } from './offer-features.type.js';

type City = [ string, number, number ];

export type MockData = {
  titles: string[];
  descriptions: string[];
  dates: Date[];
  cities: City[];
  photoPaths: string[];
  types: OfferType[];
  features: OfferFeatures;
  userNames: string[];
  userEmails: string[];
  userAvatarPaths: string[];
}
