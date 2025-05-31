import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Content_Comment } from './entities/content_comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IContentServiceWriteOrReadComment } from '../05.Contents/interfaces/contents-service.interface';

@Injectable()
export class Content_CommentSerivce {
  constructor(
    @InjectRepository(Content_Comment)
    private readonly content_commentRepository: Repository<Content_Comment>,
  ) {}

  addComment({
    writeOrReadComment,
  }: IContentServiceWriteOrReadComment): Promise<Content_Comment> {
    return this.content_commentRepository.save({
      user: { user_nick: writeOrReadComment.user_nick },
      content: { content_num: writeOrReadComment.content_num },
      ...writeOrReadComment,
    });
  }

  readComments({
    writeOrReadComment,
  }: IContentServiceWriteOrReadComment): Promise<Content_Comment[]> {
    return this.content_commentRepository.find({
      where: { content: { content_num: writeOrReadComment.content_num } },
      relations: ['user'],
    });
  }
}
