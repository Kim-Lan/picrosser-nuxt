import mongoose from 'mongoose'
const { Schema } = mongoose;

const UserSchema = new Schema({
  userID: String,
  attempts: [AttemptSchema]
});
