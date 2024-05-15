import { Attempt } from '~/server/models/Attempt';
import { User } from '~/server/models/User';
import { Puzzle } from '~/server/models/Puzzle';

export default defineEventHandler(async (event) => {
  const { puzzleId, userId, startTimestamp, endTimestamp, isSolved } = await readBody(event);

  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw createError({
      statusCode: 500,
      statusMessage: 'User not found'
    })
  }

  const puzzle = await Puzzle.findOne({ _id: puzzleId });
  if (!puzzle) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Puzzle not found'
    })
  }

  const attempt = await Attempt.create({
    puzzle: puzzleId,
    user: userId,
    startTime: new Date(startTimestamp),
    endTime: new Date(endTimestamp),
    isSolved,
  });

  user.attempts.push(attempt._id);
  await user.save();

  puzzle.attempts.push(attempt._id);
  await puzzle.save();

  return {
    attemptId: attempt._id,
  };
})
