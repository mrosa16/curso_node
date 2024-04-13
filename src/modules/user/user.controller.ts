import { ReturnError } from "@exceptions/dtos/return-error.dto";
import { notFoundException } from "@exceptions/not-found-exceptions";
import { verifyToken } from "@utils/auth";
import { Request, Response, Router } from "express";
import { userInsertDTO } from "./dtos/user-insert.dto";
import { createUser, getUsers } from "./user.service";

const userRouter = Router();
const router = Router();

userRouter.use("/user", router);
router.get("/", async (req: Request, res: Response): Promise<void> => {
  const authorization = req.headers.authorization;
  verifyToken(authorization)
    .then(async () => {
      const users = await getUsers().catch((error) => {
        if (error instanceof notFoundException) {
          res.status(204);
        } else {
          new ReturnError(res, error);
        }
      });

      res.send(users);
    })
    .catch((error) => {
      new ReturnError(res, error);
    });
});

router.post(
  "/",
  async (req: Request<undefined, undefined, userInsertDTO>, res: Response): Promise<void> => {
    const user = await createUser(req.body).catch((error) => {
      new ReturnError(res, error);
    });
    res.send(user);
  }
);

export default userRouter;
