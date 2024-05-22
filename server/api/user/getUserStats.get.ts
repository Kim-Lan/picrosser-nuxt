import { User } from '~/server/models/User';

export default defineEventHandler(async (event) => {
  const { username } = await getQuery(event);

  const user = await User.findOne({ username: { '$regex': username, $options: 'i' } });

  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User not found',
    })
  }

  return {
    username,
    currentStats: user.toObject().currentStats,
    recordStats: user.toObject().recordStats,
  }
})
