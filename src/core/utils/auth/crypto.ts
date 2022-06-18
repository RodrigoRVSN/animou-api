import * as bcrypt from 'bcrypt';

export const encryptPassword = async (password: string) => {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);

  return hash;
};

export const compareHash = async (password: string, hash: string) => {
  const isMatch = await bcrypt.compare(password, hash);
  return isMatch;
};
