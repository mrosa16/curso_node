import { userModel } from "@modules/user/user.model";
import { sign } from "jsonwebtoken";

export const PASSWORD_JWT = "umasenhamuitograndedepoismudar";
export const generateToken = (user: userModel): string => {
  return sign(
    {
      userId: user.id,
      email: user.email,
      typeUser: user.typeUser,
    },
    PASSWORD_JWT,
    {
      subject: String(user.id),
      expiresIn: "60480000",
    }
  );
};
