import { CheckUserInput } from 'src/apis/01.Auth/dto/auth-container.dto';

export interface IUsersServiceFindOneByInputInUser {
  inputs: Omit<CheckUserInput, 'user_id'>;
}
