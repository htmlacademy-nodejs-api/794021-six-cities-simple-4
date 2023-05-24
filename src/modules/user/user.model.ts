import mongoose from 'mongoose';
import { User } from '../../types/user.type.js';

const EMAIL_REGEXP_STRING = '^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$' as const;

export interface UserDocument extends User, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema(
  {
    avatarPath: String,
    
    email: {
      match: [ new RegExp(EMAIL_REGEXP_STRING), 'Email seems to be invalid' ],
      required: true,
      type: String,
      unique: true,
    },
    
    isPro: {
      default: false,
      type: Boolean,
    },

    name: {
      minLength: [ 1, 'Min length for a name is 1' ],
      maxLength: [ 15, 'Max length for a name is 15' ],
      required: true,
      type: String,
    },

    password: {  // TODO still not 'passwordHash'
      required: true,
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model<UserDocument>('User', userSchema);
