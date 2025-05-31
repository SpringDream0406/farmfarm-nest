import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KakaoApiService } from 'src/services/kakaoApi.service';
import { Farm } from './entities/farm.entity';
import { DataSource, Like, Repository } from 'typeorm';
import {
  IFarmServiceCheckFarm,
  IFarmServiceApplyFarm,
  IFarmServiceCreateFarm,
  IFarmServiceGetFarms,
  IFarmServiceGetMyFarmApplyInput,
  IFarmServiceGetApplicantInput,
  IFarmServiceCancelApply,
} from './interfaces/farms-service.interface';
import { Farm_ApplicationsService } from '../04.Farm_applications/farm_applications.service';
import { User } from '../02.Users/entities/users.entity';
import { Farm_Application } from '../04.Farm_applications/entities/farm_application.entity';

@Injectable()
export class FarmsService {
  constructor(
    @InjectRepository(Farm)
    private readonly farmRepository: Repository<Farm>,
    private readonly farm_ApplicationsService: Farm_ApplicationsService,
    private readonly kakaoApiService: KakaoApiService,
    private readonly dataSource: DataSource,
  ) {}

  findFarmsWithLike({ getFarmsInput }: IFarmServiceGetFarms): Promise<Farm[]> {
    return this.farmRepository.find({
      where: {
        farm_address: Like(`%${getFarmsInput.sido}%${getFarmsInput.sigungu}%`),
      },
      relations: ['user'],
    });
  }

  async createFarm({ createFarmInput }: IFarmServiceCreateFarm): Promise<string> {
    const { farm_address, user_id } = createFarmInput;
    const coordinates = await this.kakaoApiService.getLatLng(farm_address);
    const farm_img = String(Math.floor(Math.random() * 40) + 1);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const farm = await queryRunner.manager.save(Farm, {
        ...createFarmInput,
        ...coordinates,
        farm_img,
        user: { id: user_id },
      });

      const updateResult = await queryRunner.manager.update(
        User,
        { id: user_id },
        { user_type: 1 },
      );
      await queryRunner.commitTransaction();

      if (farm && updateResult.affected) return '텃밭 등록 성공';
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('텃밭 등록 실패(DB)');
    } finally {
      queryRunner.release();
    }
  }

  getFarms({ getFarmsInput }: IFarmServiceGetFarms): Promise<Farm[]> {
    return this.findFarmsWithLike({ getFarmsInput });
  }

  async checkFarm({ checkFarmInput }: IFarmServiceCheckFarm): Promise<string> {
    const apply = await this.farm_ApplicationsService.checkFarmApply({ checkFarmInput });
    if (apply) throw new BadRequestException('텃밭 신청 내역 있음');
    return '텃밭 신청 내역 없음';
  }

  async applyFarm({ applyFarmInput }: IFarmServiceApplyFarm): Promise<string> {
    const { farm_num, farm_sector } = applyFarmInput;
    const appliedNumber = await this.farm_ApplicationsService.countFarmApply({
      farm_num,
    });
    if (farm_sector <= appliedNumber)
      throw new ConflictException('분양 신청 자리가 다 찼습니다.');
    const apply = this.farm_ApplicationsService.applyFarm({ applyFarmInput });
    if (!apply) throw new InternalServerErrorException('분양 신청 실패');
    return '분양 신청 성공';
  }

  getMyFarmApply({
    getMyFarmApplyInput,
  }: IFarmServiceGetMyFarmApplyInput): Promise<Farm_Application[]> {
    return this.farm_ApplicationsService.findApplyFarmByUserId({ getMyFarmApplyInput });
  }

  async getApplicant({
    getApplicantInput,
  }: IFarmServiceGetApplicantInput): Promise<Farm_Application[]> {
    const farm_num = await this.farmRepository.find({
      where: { user: { id: getApplicantInput.user_id } },
      select: ['farm_num'],
    });
    const farmNums = farm_num.map((farm) => farm.farm_num);
    return this.farm_ApplicationsService.findApplicantByFarmNum({ farmNums });
  }

  async cancelApply({ cancelApply }: IFarmServiceCancelApply): Promise<boolean> {
    const result = await this.farm_ApplicationsService.cancelApply({ cancelApply });
    return result.affected ? true : false;
  }
}

// 이미지 파일 받을 때
// changeImgName(user_id: string, file: Express.Multer.File) {
//   const newName = `${user_id}_${Date.now()}_${file.originalname}`;
//   return newName;
// }

// async createFarmWithImgFile({ createFarmInput, file }) {
//   const { user_id, farm_address } = createFarmInput;
//   const { lat, lng } = await this.kakaoApiService.getLatLng(farm_address);
//   const changedImgName = this.changeImgName(user_id, file);
//   const farmData = { ...createFarmInput, lat, lng, farm_img: changedImgName };
//   console.log(farmData);

//   const farm = this.farmRepository.save(farmData);
//   if (farm) return '텃밭 등록 성공';
// }
