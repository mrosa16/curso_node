import { PrismaClient } from "@prisma/client";
import { notFoundException } from "../../exceptions/not-found-exceptions";
import { userInsertDTO } from "./dtos/user-insert.dto";
import { userModel } from "./user.model";
const prisma = new PrismaClient();

export const getUsers = async (): Promise<userModel[]> => {
  const users = await prisma.user.findMany();

  if (users?.length === 0) {
    throw new notFoundException("User");
  }
  return users;
};

export const createUser = async (body: userInsertDTO): Promise<userModel> => {
  return prisma.user.create({
    data: body,
  });
};
