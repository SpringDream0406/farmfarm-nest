import { Body, Controller, Get, Post } from '@nestjs/common';
import { ContentsService } from './contents.service';
import {
  DeletedContentInput,
  WriteContentInput,
  WriteOrReadComment,
} from './dto/contents-controller.dto';
import { Content_Comment } from '../06.Content_comments/entities/content_comment.entity';
import { Content } from './entities/content.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('community')
@ApiTags('커뮤니티 - 텃밭 자랑하기 API')
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @Post('write_content')
  @ApiOperation({ summary: '커뮤니티 자랑하기 글 추가' })
  @ApiResponse({ status: 201, description: '글 작성 성공', type: Content })
  @ApiResponse({ status: 400, description: '빈칸 존재', type: Error })
  writeContent(@Body() writeContentInput: WriteContentInput): Promise<Content> {
    return this.contentsService.writeContent({ writeContentInput });
  }

  @Get('content')
  @ApiOperation({ summary: '커뮤니티 자랑하기 게시물들 가져오기' })
  @ApiResponse({ status: 201, description: '자랑하기 게시글들', type: [Content] })
  getContents(): Promise<Content[]> {
    return this.contentsService.getContents();
  }

  @Post('delete')
  @ApiOperation({ summary: '게시물 삭제' })
  @ApiResponse({ status: 201, description: '글 삭제 성공/실패', type: Boolean })
  deleteContent(@Body() deletedContentInput: DeletedContentInput): Promise<boolean> {
    return this.contentsService.deletedContent({ deletedContentInput });
  }

  @Post('content_comment')
  @ApiOperation({ summary: '댓글 읽기/쓰기' })
  @ApiResponse({
    status: 201,
    description: '댓글 읽기/쓰기 성공',
    type: [Content_Comment],
  })
  writeOrReadComment(
    @Body() writeOrReadComment: WriteOrReadComment,
  ): Promise<Content_Comment[]> {
    return this.contentsService.readComments({ writeOrReadComment });
  }
}
