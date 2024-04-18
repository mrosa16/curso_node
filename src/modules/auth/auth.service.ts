import { notFoundException } from '@exceptions/not-found-exceptions';
import { getUserByEmail } from '@modules/user/user.service';
import { generateToken } from '@utils/auth';
import { validadePassword } from '@utils/password';
import { AuthModel } from './auth.module';
import { AuthDTO } from './dtos/auth.dto';

export const validateAuth = async (authDto: AuthDTO): Promise<AuthModel> => {
  const user = await getUserByEmail(authDto.email);
  const isValidPassword = await validadePassword(authDto.password, user.password);

  if (!isValidPassword) {
    throw new notFoundException('User');
  }

  return new AuthModel(generateToken(user), user);
};
