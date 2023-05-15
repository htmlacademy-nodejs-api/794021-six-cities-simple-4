import { OfferGeneratorInterface } from './offer-generator.interface.js';
import { getRandomItem, getRandomItems } from '../../core/helpers/index.js';
import { getRandomNumber } from '../../core/helpers/random.js';
import { OfferGuestCount, OfferPrice, OfferRating, OfferRoomCount } from '../../consts/offers.js';
import { MockData } from '../../types/mock-data.type.js';

const COLUMN_SEPARATOR = '\t';
const MOCK_PASSWORD = '123'; // TODO: 'password' field is not required by now due to loosened requirements
const TEN_KILOMETERS_IN_GEO_DEGREES = 10 / 40000 / 360;


export default class OfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly data: MockData) {}


  public generate(): string {
    const title = getRandomItem<string>(this.data.titles);
    const description = getRandomItem<string>(this.data.descriptions);
    const publicationDate = getRandomItem<Date>(this.data.dates);
    const cityValues = getRandomItem<[string, number, number]>(this.data.cities);
    const city = cityValues.join(';');
    const previewPath = getRandomItem<string>(this.data.photoPaths);
    const photosPathsString = getRandomItems<string>(this.data.photoPaths).join(';');
    const isPremium = getRandomNumber(0, 1) === 1;
    const rating = getRandomNumber(OfferRating.Min, OfferRating.Max, OfferRating.FractionCount);
    const offerType = getRandomItem<string>(this.data.types);
    const roomCount = getRandomNumber(OfferRoomCount.Min, OfferRoomCount.Max);
    const maxGuestCount = getRandomNumber(OfferGuestCount.Min, OfferGuestCount.Max);
    const price = getRandomNumber(OfferPrice.Min, OfferPrice.Max, OfferPrice.FractionCount);
    const featuresString = getRandomItems<string>(this.data.features).join(';');

    const hostName = getRandomItem<string>(this.data.userNames);
    const hostEmail = getRandomItem<string>(this.data.userEmails);
    const hostAvatarUrl = getRandomItem<string>(this.data.userAvatarPaths);
    const hostPassword = MOCK_PASSWORD;
    const host = [ hostName, hostEmail, hostAvatarUrl, hostPassword ].join(';');

    // TODO: 'comment' field is not required by now due to loosened requirements
    const commentCount = 0;
    const location = OfferGenerator.generateNearbyLocation(cityValues);

    return [
      title, description, publicationDate,
      city, previewPath, photosPathsString, isPremium,
      rating, offerType, roomCount,
      maxGuestCount, price, featuresString,
      host, commentCount, location
    ].join(COLUMN_SEPARATOR);
  }


  private static generateNearbyLocation([ _name, latitude, longitude ]: [ string, number, number ]): string {
    const latitudeDistanceInDegrees = getRandomNumber(0, TEN_KILOMETERS_IN_GEO_DEGREES, 6);
    const longitudeDistanceInDegrees = getRandomNumber(0, TEN_KILOMETERS_IN_GEO_DEGREES, 6);

    const nearbyLatitude = latitude + latitudeDistanceInDegrees;
    const nearbyLongitude = longitude + longitudeDistanceInDegrees;
    return `${nearbyLatitude};${nearbyLongitude}`;
  }
}
