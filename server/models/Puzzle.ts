import mongoose from 'mongoose'
const { Schema, model } = mongoose;

export interface PuzzleDocument extends Document {
  width: number;
  height: number;
  rowKeys: array;
  colKeys: array;
  goal: string;
  attempts: array;
}

const PuzzleSchema = new Schema({
  width: {
    type: Number,
    required: true,
    default: 5,
    immutable: true,
  },
  height: {
    type: Number,
    required: true,
    default: 5,
    immutable: true,
  },
  rowKeys: {
    type: Array,
    required: true,
    immutable: true,
  },
  colKeys: {
    type: Array,
    required: true,
    immutable: true,
  },
  goal: {
    type: String,
    required: true,
    unique: true,
    immutable: true,
  },
  attempts: [{
    type: Schema.Types.ObjectId,
    ref: 'Attempt',
  }],
},
{
  timestamps: true,
});

export const Puzzle = model<PuzzleDocument>('Puzzle', PuzzleSchema);
