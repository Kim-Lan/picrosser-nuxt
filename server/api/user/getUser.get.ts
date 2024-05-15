import { User } from '~/server/models/User';

export default defineEventHandler(async (event) => {
  const { username } = await getQuery(event);

  const user = await User.findOne({ username }).populate('attempts');
  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User not found',
    })
  }

  return {
    username,
    createdAt: user.createdAt,
    attempts: user.attempts,
  }
})
