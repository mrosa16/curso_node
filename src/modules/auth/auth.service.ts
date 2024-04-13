import { notFoundException } from "@exceptions/not-found-exceptions";
import { userModel } from "@modules/user/user.model";
import { getUserByEmail } from "@modules/user/user.service";
import { validadePassword } from "@utils/password";
import { AuthDTO } from "./dtos/auth.dto";

export const validateAuth = async (authDto: AuthDTO): Promise<userModel> => {
  const user = await getUserByEmail(authDto.email);
  const isValidPassword = await validadePassword(authDto.password, user.password);

  if (!isValidPassword) {
    throw new notFoundException("User");
  }

  return user;
};
