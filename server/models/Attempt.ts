import mongoose from 'mongoose'
const { Schema, model } = mongoose;

const AttemptSchema = new Schema({
  puzzle: {
    type: Schema.Types.ObjectId,
    ref: 'Puzzle',
    required: true,
    immutable: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    immutable: true,
  },
  startTime: {
    type: Date,
    required: true,
    immutable: true,
  },
  endTime: {
    type: Date,
    required: true,
    default: Date.now,
    immutable: true,
  },
  totalTime: {
    type: Number,
    required: true,
    immutable: true,
  }
});

export const Attempt = model('Attempt', AttemptSchema);
