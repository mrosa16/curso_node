import { ReturnError } from '@exceptions/dtos/return-error.dto';
import { notFoundException } from '@exceptions/not-found-exceptions';
import { getUserByToken } from '@utils/auth';
import { Request, Response, Router } from 'express';
import { authAdminMiddleware } from 'src/middlewares/auth-admin.middleware';
import { authMiddleware } from 'src/middlewares/auth.middleware';
import { userEditPasswordDTO } from './dtos/user-edit-password.dto';
import { userInsertDTO } from './dtos/user-insert.dto';
import { createUser, editPassword, getUsers } from './user.service';

const createUserController = async (
  req: Request<undefined, undefined, userInsertDTO>,
  res: Response,
): Promise<void> => {
  const user = await createUser(req.body).catch((error) => {
    new ReturnError(res, error);
  });
  res.send(user);
};

const getUsersController = async (req: Request, res: Response): Promise<void> => {
  const users = await getUsers().catch((error) => {
    if (error instanceof notFoundException) {
      res.status(204);
    } else {
      new ReturnError(res, error);
    }
  });

  res.send(users);
};

const editPasswordController = async (
  req: Request<undefined, undefined, userEditPasswordDTO>,
  res: Response,
): Promise<void> => {
  const userAuth = await getUserByToken(req);
  const user = await editPassword(userAuth.userId, req.body).catch((error) => {
    new ReturnError(res, error);
  });
  res.send(user);
};

const userRouter = Router();
const router = Router();
userRouter.use('/user', router);

router.post('/', createUserController);
router.use(authMiddleware);
router.patch('/', editPasswordController);
router.use(authAdminMiddleware);
router.get('/', getUsersController);

export default userRouter;
