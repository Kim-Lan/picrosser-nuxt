import { User } from '~/server/models/User';
import bcrypt from 'bcrypt';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.username || !body.email || !body.password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Missing required fields',
    })
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(body.password, salt);

  const user = await User.create({ ... body, password: hashedPassword });

  return {
    id: user._id,
    email: user.email,
    username: user.username,
  };
})
