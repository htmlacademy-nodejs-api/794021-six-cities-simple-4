import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { ApplicationComponent } from '../../types/application-component.enum.js';
import { CommentServiceInterface } from './comment-service.interface.js';
import { CommentEntity, CommentModel } from './comment.entity.js';
import CommentService from './comment.service.js';


export function createCommentContainer() {
  const commentContainer = new Container();

  commentContainer
    .bind<CommentServiceInterface>(ApplicationComponent.CommentServiceInterface)
    .to(CommentService)
    .inSingletonScope();

  commentContainer
    .bind<types.ModelType<CommentEntity>>(ApplicationComponent.CommentModel)
    .toConstantValue(CommentModel);

  return commentContainer;
}
