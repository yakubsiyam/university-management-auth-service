import { Model } from 'mongoose';

export type IUser = {
  id: string;
  role: string;
  password: string;
  // student?: Types.ObjectId | IStudent,
  // faculty?: Types.ObjectId | IFaculty;  future
  // admin?: Type.ObjectId | IAdmin; future
};

export type UserModel = Model<IUser, Record<string, unknown>>;
