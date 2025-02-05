import mongoose from 'mongoose'
import { Attempt } from '~/server/models/Attempt'
import { arraySum, minArray, maxArray } from '~/server/utils/arrayHelpers'
const { Schema, model } = mongoose;

export interface UserDocument extends Document {
  email: string;
  username: string;
  password: string;
  isVerified: boolean;
  verificationToken: string;
  verificationTokenExpire: Date;
  resetPassword: boolean;
  attempts: array;
  currentStats: object;
  recordStats: object;
}

const USERNAME_INVALID_CHARACTERS = ' ?;:,.`\'"(){}[]|\\/';

function usernameValidator(value) {
  for (let i = 0; i < USERNAME_INVALID_CHARACTERS.length; i++) {
    if (value.includes(USERNAME_INVALID_CHARACTERS[i])) {
      return false;
    }
  }
  return true;
}

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minLength: [4, 'Username must be at least 4 characters long'],
    validate: [usernameValidator, 'Invalid username'],
  },
  password: {
    type: String,
    required: true,
    minLength: [8, 'Password must be at least 8 characters long'],
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  verificationToken: {
    type: String,
    required: false,
  },
  verificationTokenExpire: {
    type: Date,
    required: false,
  },
  resetPassword: {
    type: Boolean,
    required: true,
    default: false,
  },
  attempts: [{
    type: Schema.Types.ObjectId,
    ref: 'Attempt',
  }],
  currentStats: {
    '5x5': {
      single: Number,
      meanOfThree: Number,
      averageOfFive: Number,
      averageOfTwelve: Number,
    },
    '10x10': {
      single: Number,
      meanOfThree: Number,
      averageOfFive: Number,
      averageOfTwelve: Number,
    },
    '15x15': {
      single: Number,
      meanOfThree: Number,
      averageOfFive: Number,
      averageOfTwelve: Number,
    },
    '20x20': {
      single: Number,
      meanOfThree: Number,
      averageOfFive: Number,
      averageOfTwelve: Number,
    },
    '25x25': {
      single: Number,
      meanOfThree: Number,
      averageOfFive: Number,
      averageOfTwelve: Number,
    },
  },
  recordStats: {
    '5x5': {
      single: Number,
      meanOfThree: Number,
      averageOfFive: Number,
      averageOfTwelve: Number,
    },
    '10x10': {
      single: Number,
      meanOfThree: Number,
      averageOfFive: Number,
      averageOfTwelve: Number,
    },
    '15x15': {
      single: Number,
      meanOfThree: Number,
      averageOfFive: Number,
      averageOfTwelve: Number,
    },
    '20x20': {
      single: Number,
      meanOfThree: Number,
      averageOfFive: Number,
      averageOfTwelve: Number,
    },
    '25x25': {
      single: Number,
      meanOfThree: Number,
      averageOfFive: Number,
      averageOfTwelve: Number,
    },
  }
},
{
  timestamps: true,
  methods: {
    async updateStats(height, width, result) {
      const dimensions = `${height}x${width}`;
      let meanOfThree = -1;

      const best = this.recordStats[dimensions].single;
      if (!best) {
        this.recordStats[dimensions].single = result;
      } else if (result < best) {
        this.recordStats[dimensions].single = result;
      }

      if (this.attempts.length >= 3) {
        const lastThreeTimes = await this.getRecentTimes(3, height, width);
        if (lastThreeTimes.length === 3) {
          meanOfThree = Math.floor(arraySum(lastThreeTimes) / 3);
          // console.log(`mean of three: ${meanOfThree}`);
          const recordMeanOfThree = this.recordStats[dimensions].meanOfThree;
          if (!recordMeanOfThree) {
            this.recordStats[dimensions].meanOfThree = meanOfThree;
          } else if (meanOfThree < recordMeanOfThree) {
            this.recordStats[dimensions].meanOfThree = meanOfThree;
          }
        }
      }

      let averageOfFive = -1;
      if (this.attempts.length >= 5) {
        const lastFiveTimes = await this.getRecentTimes(5, height, width);

        if (lastFiveTimes.length === 5) {
          const minIndex = lastFiveTimes.indexOf(minArray(lastFiveTimes));
          lastFiveTimes.splice(minIndex, 1);
          const maxIndex = lastFiveTimes.indexOf(maxArray(lastFiveTimes));
          lastFiveTimes.splice(maxIndex, 1);
          // console.log(lastFiveTimes);
          averageOfFive = Math.floor(arraySum(lastFiveTimes) / 3);
          // console.log(`average of five: ${averageOfFive}`);

          const recordAverageOfFive = this.recordStats[dimensions].averageOfFive;
          if (!recordAverageOfFive) {
            this.recordStats[dimensions].averageOfFive = averageOfFive;
          } else if (averageOfFive < recordAverageOfFive) {
            this.recordStats[dimensions].averageOfFive = averageOfFive;
          }
        }
      }
      
      let averageOfTwelve = -1;
      if (this.attempts.length >= 12) {
        const lastTwelveTimes = await this.getRecentTimes(12, height, width);

        if (lastTwelveTimes.length === 12) {
          const minIndex = lastTwelveTimes.indexOf(minArray(lastTwelveTimes));
          lastTwelveTimes.splice(minIndex, 1);
          const maxIndex = lastTwelveTimes.indexOf(maxArray(lastTwelveTimes));
          lastTwelveTimes.splice(maxIndex, 1);
          // console.log(lastTwelveTimes);
          averageOfTwelve = Math.floor(arraySum(lastTwelveTimes) / 10);
          // console.log(`average of twelve: ${averageOfTwelve}`);

          const recordAverageOfTwelve = this.recordStats[dimensions].averageOfTwelve;
          if (!recordAverageOfTwelve) {
            this.recordStats[dimensions].averageOfTwelve = averageOfTwelve;
          } else if (averageOfTwelve < recordAverageOfTwelve) {
            this.recordStats[dimensions].averageOfTwelve = averageOfTwelve;
          }
        }
      }

      this.currentStats[dimensions] = {
        single: result,
        meanOfThree,
        averageOfFive,
        averageOfTwelve,
      };
    },
    async getRecentTimes(n, height, width) {
      const recent = [];
      let i = 0;
      while(recent.length < n && i < this.attempts.length) {
        const attemptId = this.attempts[this.attempts.length - 1 - i];
        const attempt = await Attempt.findById(attemptId).populate('puzzle', 'height width');
        if (attempt.puzzle.height === height && attempt.puzzle.width === width) {
          recent.push(attempt.totalTime);
        }
        i++;
      }
      return recent;
    }
  }
});

export const User = model<UserDocument>('User', UserSchema);
