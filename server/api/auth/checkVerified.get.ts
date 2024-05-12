import { User } from '~/server/models/User';

export default defineEventHandler(async (event) => {
  const { email } = getQuery(event);

  if (!email) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing email',
    })
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: `User with email ${email} not found`,
    })
  }

  return user.isVerified;
});
