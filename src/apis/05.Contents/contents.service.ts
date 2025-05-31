import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Content } from './entities/content.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IContentServiceDeletedContent,
  IContentServiceWriteContent,
  IContentServiceWriteOrReadComment,
} from './interfaces/contents-service.interface';
import { Content_CommentSerivce } from '../06.Content_comments/content_comment.service';
import { Content_Comment } from '../06.Content_comments/entities/content_comment.entity';

@Injectable()
export class ContentsService {
  constructor(
    @InjectRepository(Content)
    private readonly contentRepository: Repository<Content>,
    private readonly content_CommentSerivce: Content_CommentSerivce,
  ) {}

  writeContent({ writeContentInput }: IContentServiceWriteContent): Promise<Content> {
    const img = String(Math.floor(Math.random() * 40) + 1);
    return this.contentRepository.save({
      content_img: img,
      user: { user_nick: writeContentInput.user_nick },
      ...writeContentInput,
    });
  }

  getContents(): Promise<Content[]> {
    return this.contentRepository.find({ relations: ['user'] });
  }

  async deletedContent({
    deletedContentInput,
  }: IContentServiceDeletedContent): Promise<boolean> {
    const result = await this.contentRepository.softDelete({
      ...deletedContentInput,
    });
    return result.affected ? true : false;
  }

  async readComments({
    writeOrReadComment,
  }: IContentServiceWriteOrReadComment): Promise<Content_Comment[]> {
    if (writeOrReadComment.content_comment)
      await this.content_CommentSerivce.addComment({ writeOrReadComment });
    return this.content_CommentSerivce.readComments({ writeOrReadComment });
  }
}
