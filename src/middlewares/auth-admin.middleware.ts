import { userTypeEnum } from '@enums/user-tyoe.enum';
import { ReturnError } from '@exceptions/dtos/return-error.dto';
import { unauthorizedException } from '@exceptions/unauthorized-exception';
import { UserAuth } from '@modules/auth/dtos/user-auth.dto';
import { verifyToken } from '@utils/auth';
import { NextFunction } from 'express';

export const authAdminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const authorization = req.headers.authorization;

  await verifyToken(authorization)
    .then((user: UserAuth) => {
      if (user.typeUser !== userTypeEnum.ADMIN) {
        new ReturnError(res, new unauthorizedException());
      } else {
        next();
      }
    })
    .catch((error) => {
      new ReturnError(res, error);
    });
};
