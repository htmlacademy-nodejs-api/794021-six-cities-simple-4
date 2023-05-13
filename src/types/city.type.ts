import { Location } from './location.type';

export type CityName =
  | 'Paris'
  | 'Cologne'
  | 'Brussels'
  | 'Amsterdam'
  | 'Hamburg'
  | 'Dusseldorf'

export type City = {
  location: Location;
  name: CityName;
}
