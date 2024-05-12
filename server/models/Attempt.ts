import mongoose from 'mongoose'
const { Schema, model } = mongoose;

const AttemptSchema = new Schema({
  puzzleID: String,
  attemptNumber: Number,
  username: String,
  startTime: Date,
  endTime: Date,
  solved: Boolean
},
{
  methods: {
    getResult() {
      return solved ? endTime - startTime : -1; // -1 means DNF (Did Not Finish)
    }
  }
});

export const Attempt = model('Attempt', AttemptSchema);
