import { OfferParserInterface } from './offer-parser.interface';
import { StringFile } from '../../consts/files.js';
import { City, CityName } from '../../types/city.type';
import { Location } from '../../types/location.type';
import { OfferFeature, OfferFeatures } from '../../types/offer-features.type';
import { OfferType } from '../../types/offer-type.type';
import { Offer } from '../../types/offers.type';
import { User } from '../../types/user.type';


export class OfferParser implements OfferParserInterface {
  constructor(private readonly str: string) {}


  public parse(): Offer {
    const columns = this.str.split(StringFile.ColumnSeparator);

    const [
      title,
      description,
      date,
      city,
      previewPath,
      photoPaths,
      isPremium,
      rating,
      type,
      roomCount,
      maxGuestCount,
      price,
      features,
      host,
      commentCount,
      location,
    ] = columns;

    return {
      title,
      description,
      publicationDate: new Date(date),
      city: OfferParser.parseCity(city),
      previewPath,
      photoPaths: OfferParser.parsePhotoPaths(photoPaths),
      isPremium: isPremium === 'true',
      rating: Number.parseFloat(rating),
      type: type as OfferType,
      roomCount: Number.parseInt(roomCount, 10),
      maxGuestCount: Number.parseInt(maxGuestCount, 10),
      price: Number.parseInt(price, 10),
      features: OfferParser.parseFeatures(features),
      host: OfferParser.parseHost(host),
      commentCount: Number.parseInt(commentCount, 10),
      location: OfferParser.parseLocation(location),
    };
  }


  private static parseCity(city: string): City {
    const [ name, latitude, longitude ] = city.split(StringFile.ColumnSubitemSeparator);
    return {
      name: name as CityName,
      location: {
        latitude: Number.parseFloat(latitude),
        longitude: Number.parseFloat(longitude),
      },
    };
  }


  private static parseFeatures(features: string): OfferFeatures {
    return features.
      split(StringFile.ColumnSubitemSeparator).
      map((offer) => offer as OfferFeature);
  }


  private static parseHost(host: string): User {
    const [ name, email, avatarPath, password, isPro ] = host.split(StringFile.ColumnSubitemSeparator);
    return {
      avatarPath,
      email,
      isPro: isPro === 'true',
      name,
      password,
    };
  }


  private static parseLocation(location: string): Location {
    const [ latitude, longitude ] = location.split(StringFile.ColumnSubitemSeparator);
    return {
      latitude: Number.parseFloat(latitude),
      longitude: Number.parseFloat(longitude),
    };
  }


  private static parsePhotoPaths(photoPaths: string): string[] {
    return photoPaths.split(StringFile.ColumnSubitemSeparator);
  }

}
