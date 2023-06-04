import { DocumentType } from '@typegoose/typegoose';
import CreateOfferDto from './dto/create-offer.dto.js';
import { OfferEntity } from './offer.entity.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import UpdateOfferWithCommentDto from './dto/update-offer-with-comment.dto.js';


export interface OfferServiceInterface {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  delete(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  update(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  updateWithComment(offerId: string, dto: UpdateOfferWithCommentDto): Promise<DocumentType<OfferEntity> | null>;
}
