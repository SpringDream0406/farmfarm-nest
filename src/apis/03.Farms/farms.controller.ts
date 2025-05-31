import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  // UploadedFile,
  // UseInterceptors,
} from '@nestjs/common';
import { FarmsService } from './farms.service';
// import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApplyFarmInput,
  CancelApply,
  CheckFarmInput,
  CreateFarmInput,
  GetApplicantInput,
  GetFarmsInput,
  GetMyFarmApply,
} from './dto/farms-container.dto';
import { Farm } from './entities/farm.entity';
import { Farm_Application } from '../04.Farm_applications/entities/farm_application.entity';
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('farm')
@ApiTags('텃밭 API')
export class FarmsController {
  constructor(
    private readonly farmService: FarmsService, //
  ) {}

  @Post('add_farm')
  @ApiOperation({ summary: '텃밭 내놓기 (이미지 안받는 api)' })
  @ApiResponse({ status: 201, description: '텃밭 등록 성공', type: String })
  @ApiResponse({ status: 400, description: '빈칸 존재', type: Error })
  @ApiResponse({ status: 500, description: '텃밭 등록 실패(DB)', type: Error })
  createFarm(@Body() createFarmInput: CreateFarmInput): Promise<string> {
    return this.farmService.createFarm({ createFarmInput });
  }

  // 개인정보도 같이 보내는거라 Post로 바꿔야하지만 프론트 로직도 바꿔야하고, Get스타일에 가장 잘 맞는 API라 그대로 놔둠.
  @Get('farm')
  @ApiOperation({ summary: '텃밭들 검색' })
  @ApiResponse({ status: 200, description: '텃밭들 검색 결과', type: [Farm] })
  getFarms(@Query() getFarmsInput: GetFarmsInput): Promise<Farm[]> {
    return this.farmService.getFarms({ getFarmsInput });
  }

  @Post('farm_check')
  @ApiOperation({ summary: '텃밭 신청 내역 체크' })
  @ApiResponse({ status: 201, description: '텃밭 신청 내역 없음', type: String })
  @ApiResponse({ status: 400, description: '텃밭 신청 내역 있음', type: Error })
  checkFarm(@Body() checkFarmInput: CheckFarmInput): Promise<string> {
    return this.farmService.checkFarm({ checkFarmInput });
  }

  @Post('farm_apply')
  @ApiOperation({ summary: '텃밭 분양 신청' })
  @ApiResponse({ status: 201, description: '분양 신청 성공', type: String })
  @ApiResponse({ status: 409, description: '분양 신청 자리가 다 찼습니다.', type: Error })
  @ApiResponse({ status: 500, description: '분양 신청 실패(DB)', type: Error })
  applyFarm(@Body() applyFarmInput: ApplyFarmInput): Promise<string> {
    return this.farmService.applyFarm({ applyFarmInput });
  }

  @Post('my_apply')
  @ApiOperation({ summary: '텃밭 분양 신청 내역들' })
  @ApiResponse({ status: 201, description: '분양 신청 내역들', type: [Farm_Application] })
  getMyFarmApply(
    @Body() getMyFarmApplyInput: GetMyFarmApply,
  ): Promise<Farm_Application[]> {
    return this.farmService.getMyFarmApply({ getMyFarmApplyInput });
  }

  @Post('applicant') // 텃밭 분양 신청자 내역
  @ApiOperation({ summary: '내놓은 텃밭의 분양 신청자들' })
  @ApiOkResponse({ status: 201, description: '분양 신청자들', type: [Farm_Application] })
  getApplicant(
    @Body() getApplicantInput: GetApplicantInput,
  ): Promise<Farm_Application[]> {
    return this.farmService.getApplicant({ getApplicantInput });
  }

  @Post('cancel') // 텃밭 분양 신청 취소
  @ApiOperation({ summary: '텃밭 분양 신청 취소' })
  @ApiResponse({ status: 201, description: '취소 성공/실패', type: Boolean })
  cancelApply(@Body() cancelApply: CancelApply): Promise<boolean> {
    return this.farmService.cancelApply({ cancelApply });
  }
}

// @Post('add_farm') // 이미지 파일 받을 때 농장 등록
// @UseInterceptors(FileInterceptor('farm_img'))
// createFarm(
//   @Body() createFarmInput: CreateFarmInput,
//   @UploadedFile() file: Express.Multer.File,
// ) {
//   return this.farmService.createFarmWithImgFile({ createFarmInput, file });
// }
