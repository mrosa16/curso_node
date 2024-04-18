import { compare, hash } from 'bcrypt';

export const createPasswordHashed = async (password: string): Promise<string> => {
  const saltRound = 10;

  return hash(password, saltRound);
};

export const validadePassword = async (
  passsword: string,
  passwordHashed: string,
): Promise<boolean> => {
  return compare(passsword, passwordHashed);
};
