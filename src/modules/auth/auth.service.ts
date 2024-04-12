import { userModel } from "@modules/user/user.model";
import { getUserByEmail } from "@modules/user/user.service";
import { AuthDTO } from "./dtos/auth.dto";

export const validateAuth = (authDto: AuthDTO): Promise<userModel> => {
  const user = getUserByEmail(authDto.email);

  return user;
};
