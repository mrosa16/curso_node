import { ReturnError } from "@exceptions/dtos/return-error.dto";
import { Router } from "express";
import { validateAuth } from "./auth.service";
import { AuthDTO } from "./dtos/auth.dto";

const authRouter = Router();
const router = Router();

authRouter.use("/auth", router);

router.post(
  "/",
  async (req: Request<undefined, undefined, undefined, AuthDTO>, res: Response): Promise<void> => {
    const user = await validateAuth(req.body).catch((error) => {
      new ReturnError(res, error);
    });
    res.send(user);
  }
);

export default authRouter;
