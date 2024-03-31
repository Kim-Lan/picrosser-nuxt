import mongoose from 'mongoose'
const { Scheme } = mongoose;

const AttemptSchema = new Schema({
  puzzleID: String,
  attemptNumber: Number,
  user: UserSchema,
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
