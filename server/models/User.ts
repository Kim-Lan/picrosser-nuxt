import mongoose from 'mongoose';
const { Schema, model } = mongoose;

export interface UserDocument extends Document {
  email: string;
  username: string;
  password: string;
}

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password must be at least 8 characters long"],
  },
},
{
  timestamps: true,
});

export const User = model<UserDocument>('User', UserSchema);
