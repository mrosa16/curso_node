import { BasRequestException } from "@exceptions/bad-request-exception";
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

export const getUserByCpf = async (cpf: string): Promise<userModel> => {
  const user = await prisma.user.findFirst({
    where: { cpf },
  });

  if (!user) {
    throw new notFoundException("User");
  }

  return user;
};

export const getUserByEmail = async (email: string): Promise<userModel> => {
  const user = await prisma.user.findFirst({
    where: { email },
  });

  if (!user) {
    throw new notFoundException("User");
  }

  return user;
};

export const createUser = async (body: userInsertDTO): Promise<userModel> => {
  const userEmail = await getUserByEmail(body.email).catch(() => undefined);

  if (userEmail) {
    throw new BasRequestException("Email exist in DB");
  }

  const userCpf = await getUserByCpf(body.cpf).catch(() => undefined);

  if (userCpf) {
    throw new BasRequestException("CPF exist in DB");
  }

  return prisma.user.create({
    data: body,
  });
};
