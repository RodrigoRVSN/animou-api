export interface IUser {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  avatar_url: string;
  experience: number;
  level: number;
  friends_count: number;
  posts_count: number;
}

export type IRegisterUser = Pick<
  IUser,
  'email' | 'password' | 'name' | 'username'
>;
