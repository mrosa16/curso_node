import { ReturnError } from '@exceptions/dtos/return-error.dto';
import { notFoundException } from '@exceptions/not-found-exceptions';
import { Request, Response, Router } from 'express';
import { authMiddleware } from 'src/middlewares/auth.middleware';
import { userInsertDTO } from './dtos/user-insert.dto';
import { createUser, getUsers } from './user.service';

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

const userRouter = Router();
const router = Router();
userRouter.use('/user', router);

router.post('/', createUserController);

router.use(authMiddleware);
router.get('/', getUsersController);

export default userRouter;
