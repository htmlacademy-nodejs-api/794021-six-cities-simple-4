import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { CommentServiceInterface } from './comment-service.interface.js';
import CreateCommentDto from './dto/create-comment.dto.js';
import { CommentEntity } from './comment.entity.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { ApplicationComponent } from '../../types/application-component.enum.js';


@injectable()
export default class CommentService implements CommentServiceInterface {
  constructor(
    @inject(ApplicationComponent.LoggerInterface)
    private readonly logger: LoggerInterface,

    @inject(ApplicationComponent.CommentModel)
    private readonly commentModel: types.ModelType<CommentEntity>,
  ) {
  }


  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const service = await this.commentModel.create(dto);
    this.logger.info(`New comment created: ${dto.text}`);

    return service.populate([ 'offerId', 'userId' ]);
  }


  public async findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({ offerId }, {}, { limit: CommentConstraint.maxCountPerQuery })
      .populate([ 'offerId', 'userId' ])
      .exec();
  }


  public async deleteByOfferId(offerId: string): Promise<number> {
    const result = await this.commentModel.deleteMany({ offerId }).exec();
    this.logger.info(`Deleted a comment with id: "${offerId}"`);

    return result.deletedCount;
  }

}
