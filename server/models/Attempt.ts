import mongoose from 'mongoose'
const { Schema, model } = mongoose;

const AttemptSchema = new Schema({
  puzzle: {
    type: Schema.Types.ObjectId,
    ref: 'Puzzle',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
    default: Date.now,
  },
  isSolved: {
    type: Boolean,
    required: true,
    default: false,
  }
},
{
  methods: {
    getResult() {
      return isSolved ? endTime - startTime : -1; // -1 means DNF (Did Not Finish)
    }
  }
},
{
  timestamps: true,
});

export const Attempt = model('Attempt', AttemptSchema);
