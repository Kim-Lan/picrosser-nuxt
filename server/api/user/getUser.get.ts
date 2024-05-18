import { User } from '~/server/models/User';

export default defineEventHandler(async (event) => {
  const { username } = await getQuery(event);

  const user = await User
    .findOne({ username })
    .populate({
      path: 'attempts',
      select: '_id startTime totalTime',
      populate: {
        path: 'puzzle',
        select: '_id width height',
      }
    });

  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User not found',
    })
  }

  // return {
  //   ... user.toObject(),
  //   password: undefined
  // }

  return {
    username,
    createdAt: user.toObject().createdAt,
    attempts: user.toObject().attempts,
  }
})
