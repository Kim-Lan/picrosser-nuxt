import mongoose from 'mongoose'
const { Schema } = mongoose;

const PuzzleSchema = new Schema({
  puzzleID: String,
  width: Number,
  height: Number,
  rowKeys: Array,
  colKeys: Array,
  goal: String,
  attempts: [AttemptSchema]
});
