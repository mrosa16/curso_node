import { userModel } from "@modules/user/user.model";

export class AuthModel {
  token: string;
  user: userModel;
  constructor(token: string, user: userModel) {
    this.token = token;
    this.user = user;
  }
}
