import mongoose from 'mongoose'
const { Schema } = mongoose;

const PuzzleAttemptRecordSchema = new Schema({
  puzzle: PuzzleSchema,
  attempts: [AttemptSchema]
});
