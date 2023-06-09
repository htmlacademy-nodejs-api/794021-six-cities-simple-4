import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { CommentServiceInterface } from './comment-service.interface.js';
import CreateCommentDto from './dto/create-comment.dto.js';
import { CommentEntity } from './comment.entity.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { SortType } from '../../consts/database.js';
import { CommentConstraint } from '../../consts/comment.js';
import { ApplicationComponent } from '../../types/application-component.enum.js';


@injectable()
export default class CommentService implements CommentServiceInterface {
  constructor(
    @inject(ApplicationComponent.LoggerInterface)
    private readonly logger: LoggerInterface,

    @inject(ApplicationComponent.CommentModel)
    private readonly model: types.ModelType<CommentEntity>,
  ) {
  }


  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const service = await this.model.create(dto);
    this.logger.info(`New comment created: ${dto.text}`);

    return service.populate([ 'offerId', 'userId' ]);
  }


  public async findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]> {
    // TODO add user-specified limit count
    return this.model
      .find({ offerId }, {}, { limit: CommentConstraint.maxCountPerQuery })
      .sort({ createdAt: SortType.HighToLow })
      .populate([ 'offerId', 'userId' ])
      .exec();
  }


  public async delete(commentId: string): Promise<number> {
    const result = await this.model.deleteMany({ commentId }).exec();
    this.logger.info(`Deleted a comment with id: "${commentId}"`);

    return result.deletedCount;
  }

}
