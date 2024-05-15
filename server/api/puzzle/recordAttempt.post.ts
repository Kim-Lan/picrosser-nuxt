import { Attempt } from '~/server/models/Attempt';
import { User } from '~/server/models/User';
import { Puzzle } from '~/server/models/Puzzle';
import { getGoalString } from '~/server/utils/picross';

export default defineEventHandler(async (event) => {
  const { puzzle, userId, startTimestamp, endTimestamp } = await readBody(event);

  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw createError({
      statusCode: 500,
      statusMessage: 'User not found'
    })
  }

  let puzzleDocument = await Puzzle.findOne({ _id: puzzle.id});
  if (!puzzleDocument) {
    puzzleDocument = await Puzzle.create({
      _id: puzzle.id,
      width: puzzle.width,
      height: puzzle.height,
      rowKeys: puzzle.rowKeys,
      colKeys: puzzle.colKeys,
      goal: getGoalString(puzzle.solution),
    })
    if (!puzzleDocument) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to create puzzle',
      })
    }
  }

  const attempt = await Attempt.create({
    puzzle: puzzleDocument._id,
    user: userId,
    startTime: new Date(startTimestamp),
    endTime: new Date(endTimestamp),
    totalTime: endTimestamp - startTimestamp,
  });
  if (!attempt) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to save attempt',
    })
  }

  user.attempts.push(attempt._id);
  await user.save();

  puzzleDocument.attempts.push(attempt._id);
  await puzzleDocument.save();

  return {
    attemptId: attempt._id,
  };
})
