import bcrypt from 'bcryptjs';

const DEFAULT_SALT_ROUNDS = 10

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(DEFAULT_SALT_ROUNDS);
  const hash = await bcrypt.hash(password, salt);

  return hash
}

export const checkHashedPassword = async (password: string, hash: string): Promise<boolean> => {
  const res = await bcrypt.compare(password, hash);
  return res
}
