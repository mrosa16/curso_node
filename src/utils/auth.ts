import { unauthorizedException } from '@exceptions/unauthorized-exception';
import { UserAuth } from '@modules/auth/dtos/user-auth.dto';
import { userModel } from '@modules/user/user.model';
import { sign, verify } from 'jsonwebtoken';

export const PASSWORD_JWT = 'umasenhamuitograndedepoismudar';
export const generateToken = (user: userModel): string => {
  return sign(
    {
      userId: user.id,
      email: user.email,
      typeUser: user.typeUser,
    } as UserAuth,
    PASSWORD_JWT,
    {
      subject: String(user.id),
      expiresIn: '60480000',
    },
  );
};

export const verifyToken = async (authorization?: string): Promise<UserAuth> => {
  if (!authorization) {
    throw new unauthorizedException();
  }
  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer' || !token) {
    throw new unauthorizedException();
  }

  try {
    const decodedToken = verify(token, PASSWORD_JWT) as UserAuth;
    return decodedToken;
  } catch (error) {
    throw new unauthorizedException();
  }
};
