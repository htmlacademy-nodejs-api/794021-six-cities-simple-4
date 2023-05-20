import { Offer } from '../../types/offers.type';


export interface OfferParserInterface {
  parse(): Offer;
}
