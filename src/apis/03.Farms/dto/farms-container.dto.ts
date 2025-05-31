import { Farm_Application } from 'src/apis/04.Farm_applications/entities/farm_application.entity';
import { Farm } from '../entities/farm.entity';
import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateFarmInput extends OmitType(Farm, [
  'farm_num',
  'lat',
  'lng',
  'farm_img',
  'createdAt',
  'user',
]) {
  @ApiProperty({ description: 'uid', example: '49b3bd13-0a49-4f97-9b79-733bb0a709da' })
  @IsNotEmpty()
  user_id: string;
}

export class GetFarmsInput {
  @ApiProperty({ example: '광주' })
  sido: string;
  @ApiProperty({ example: '광산구' })
  sigungu: string;
}

export class CheckFarmInput extends PickType(Farm, ['farm_num']) {
  @ApiProperty({ description: 'uid', example: '49b3bd13-0a49-4f97-9b79-733bb0a709da' })
  @IsNotEmpty()
  user_id: string;
}

export class ApplyFarmInput extends PickType(Farm, ['farm_num', 'farm_sector']) {
  @ApiProperty({ description: 'uid', example: '49b3bd13-0a49-4f97-9b79-733bb0a709da' })
  @IsNotEmpty()
  user_id: string;
}

export class GetMyFarmApply {
  @ApiProperty({ description: 'uid', example: '49b3bd13-0a49-4f97-9b79-733bb0a709da' })
  @IsNotEmpty()
  user_id: string;
}

export class GetApplicantInput {
  @ApiProperty({ description: 'uid', example: '49b3bd13-0a49-4f97-9b79-733bb0a709da' })
  @IsNotEmpty()
  user_id: string;
}

export class CancelApply extends PickType(Farm_Application, ['application_num']) {}
