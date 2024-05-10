import { User } from '~/server/models/User';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.username || !body.email || !body.password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Missing required fields',
    })
  }

  const user = await User.create(body);

  return user;
})
