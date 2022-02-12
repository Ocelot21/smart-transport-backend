import mongoose, { Schema } from 'mongoose';

export const UserTypeEnum = {
  ADMIN: 'admin',
  DRIVER: 'driver'
}

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true
    },
    email: {
      type: String,
      unique: true
    },
    password: {
      type: String
    },
    role: {
      type: String,
      enum: Object.values(UserTypeEnum),
    },
  },
  { timestamps: true }
);

const User = mongoose.model(
  'User',
  UserSchema
);

export default User;