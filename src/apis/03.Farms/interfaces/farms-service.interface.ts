import {
  ApplyFarmInput,
  CancelApply,
  CheckFarmInput,
  CreateFarmInput,
  GetApplicantInput,
  GetFarmsInput,
  GetMyFarmApply,
} from '../dto/farms-container.dto';

export interface IFarmServiceCreateFarm {
  createFarmInput: CreateFarmInput;
}

export interface IFarmServiceGetFarms {
  getFarmsInput: GetFarmsInput;
}

export interface IFarmServiceCheckFarm {
  checkFarmInput: CheckFarmInput;
}

export interface IFarmServiceApplyFarm {
  applyFarmInput: ApplyFarmInput;
}

export interface IFarmServiceGetMyFarmApplyInput {
  getMyFarmApplyInput: GetMyFarmApply;
}

export interface IFarmServiceGetApplicantInput {
  getApplicantInput: GetApplicantInput;
}

export interface IFarmServiceCancelApply {
  cancelApply: CancelApply;
}
