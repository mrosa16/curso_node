import { PrismaClient } from "@prisma/client";
import { userInsertDTO } from "./dtos/user-insert.dto";
import { userModel } from "./user.model";
const prisma = new PrismaClient();
export const getUsers = async (): Promise<userModel[]> => {
  return prisma.user.findMany();
};

export const createUser = async (body: userInsertDTO): Promise<userModel> => {
  return prisma.user.create({
    data: body,
  });
};
