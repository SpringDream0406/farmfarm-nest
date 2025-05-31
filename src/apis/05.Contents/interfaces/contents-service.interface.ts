import {
  DeletedContentInput,
  WriteContentInput,
  WriteOrReadComment,
} from '../dto/contents-controller.dto';

export interface IContentServiceWriteContent {
  writeContentInput: WriteContentInput;
}

export interface IContentServiceDeletedContent {
  deletedContentInput: DeletedContentInput;
}

export interface IContentServiceWriteOrReadComment {
  writeOrReadComment: WriteOrReadComment;
}
