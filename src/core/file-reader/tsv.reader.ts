import { readFileSync } from 'node:fs';
import { FileReaderInterface } from './file-reader.interface.js';
import { Offers } from '../../types/offers.type.js';
import { City, CityName } from '../../types/city.type.js';
import { OfferFeature, OfferFeatures } from '../../types/offer-features.type.js';
import { User } from '../../types/user.type.js';
import { Location } from '../../types/location.type.js';
import { OfferType } from '../../types/offer-type.type.js';

const Separator = {
  Line: '\n',
  Column: '\t',
  ColumnSubItem: ';',
} as const;

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) { }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf8' });
  }

  public toArray(): Offers {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split(Separator.Line)
      .filter((row) => row.trim() !== '')
      .map((line) => line.split(Separator.Column))
      .map((columns) => {
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
          city: this.parseCity(city),
          previewPath,
          photoPaths: this.parsePhotoPaths(photoPaths),
          isPremium: isPremium === 'true',
          rating: Number.parseFloat(rating),
          type: OfferType[type as keyof typeof OfferType],
          roomCount: Number.parseInt(roomCount, 10),
          maxGuestCount: Number.parseInt(maxGuestCount, 10),
          price: Number.parseInt(price, 10),
          features: this.parseFeatures(features),
          host: this.parseHost(host),
          commentCount: Number.parseInt(commentCount, 10),
          location: this.parseLocation(location),
        };
      });
  }

  protected parseCity(city: string): City {
    const [ name, latitude, longitude ] = city.split(Separator.ColumnSubItem);
    return {
      name: CityName[name as keyof typeof CityName],
      location: {
        latitude: Number.parseFloat(latitude),
        longitude: Number.parseFloat(longitude),
      },
    };
  }


  protected parseFeatures(features: string): OfferFeatures {
    return features.
      split(Separator.ColumnSubItem).
      map((offer) => offer as OfferFeature);
  }


  protected parseHost(host: string): User {
    const [ name, email, avatarPath, password, isPro ] = host.split(Separator.ColumnSubItem);
    return {
      avatarPath,
      email,
      isPro: isPro === 'true',
      name,
      password,
    };
  }


  protected parseLocation(location: string): Location {
    const [ latitude, longitude ] = location.split(Separator.ColumnSubItem);
    return {
      latitude: Number.parseFloat(latitude),
      longitude: Number.parseFloat(longitude),
    };
  }


  protected parsePhotoPaths(photoPaths: string): string[] {
    return photoPaths.split(Separator.ColumnSubItem);
  }
}
