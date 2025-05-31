import {
  CheckUserInput,
  CreateUserInput,
  LoginInput,
} from '../dto/auth-container.dto';

export interface IAuthServiceCheckInput {
  checkUserInput: CheckUserInput;
}

export interface IAuthServiceLogin {
  loginInput: LoginInput;
}

export interface IAuthServiceCreate {
  createUserInput: CreateUserInput;
}
