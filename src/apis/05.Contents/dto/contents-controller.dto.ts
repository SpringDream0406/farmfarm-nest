import { ApiProperty, PickType } from '@nestjs/swagger';
import { Content } from '../entities/content.entity';
import { IsNotEmpty } from 'class-validator';

export class WriteContentInput extends PickType(Content, ['content_title', 'contents']) {
  @ApiProperty({ example: '민트초코' })
  @IsNotEmpty()
  user_nick: string;
}

export class DeletedContentInput {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  content_num: number;
}

export class WriteOrReadComment {
  @ApiProperty({ example: '민트초코' })
  @IsNotEmpty()
  user_nick: string;

  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  content_num: number;

  @ApiProperty({
    required: false,
    description: '댓글 내용이 있으면 쓰기기능 수행',
    example: '바로 삼겹살 사옵니다잉',
  })
  content_comment?: string;
}
