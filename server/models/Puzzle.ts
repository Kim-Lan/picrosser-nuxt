import mongoose from 'mongoose'
const { Schema } = mongoose;

export interface PuzzleDocument extends Document {
  puzzleID: string;
  width: number;
  height: number;
  rowKeys: array;
  colKeys: array;
  goal: string;
}


const PuzzleSchema = new Schema({
  puzzleID: {
    type: String,
    required: true,
    unique: true,
  },
  width: {
    type: Number,
    required: true,
    default: 5,
  },
  height: {
    type: Number,
    required: true,
    default: 5,
  },
  rowKeys: {
    type: Array,
    required: true,
  },
  colKeys: {
    type: Array,
    required: true,
  },
  goal: {
    type: String,
    required: true,
    unique: true,
  }
});

export const Puzzle = model<PuzzleDocument>('Puzzle', PuzzleSchema);
