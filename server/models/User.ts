import mongoose from 'mongoose';
const { Schema, model } = mongoose;

export interface UserDocument extends Document {
  email: string;
  username: string;
  password: string;
  isVerified: boolean;
  verificationToken: string;
  verificationTokenExpire: Date;
  resetPassword: boolean;
  attempts: array;
}

const USERNAME_INVALID_CHARACTERS = ' ?;:,.`\'"(){}[]|\\/';

function usernameValidator(value) {
  for (let i = 0; i < USERNAME_INVALID_CHARACTERS.length; i++) {
    if (value.includes(USERNAME_INVALID_CHARACTERS[i])) {
      return false;
    }
  }
  return true;
}

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minLength: [4, 'Username must be at least 4 characters long'],
    validate: [usernameValidator, 'Invalid username'],
  },
  password: {
    type: String,
    required: true,
    minLength: [8, 'Password must be at least 8 characters long'],
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  verificationToken: {
    type: String,
    required: false,
  },
  verificationTokenExpire: {
    type: Date,
    required: false,
  },
  resetPassword: {
    type: Boolean,
    required: true,
    default: false,
  },
  attempts: [{
    type: Schema.Types.ObjectId,
    ref: 'Attempt',
  }],
},
{
  timestamps: true,
});

export const User = model<UserDocument>('User', UserSchema);
