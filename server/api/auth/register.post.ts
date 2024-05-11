import { User } from '~/server/models/User';
import bcrypt from 'bcrypt';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.username || !body.email || !body.password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields',
    })
  }

  const existingUser = await User.findOne({ username: body.username });
  if (existingUser) {
    throw createError({
      statusCode: 409,
      statusMessage: 'Username already taken',
    })
  }

  const existingEmail = await User.findOne({ email: body.email });
  if (existingEmail) {
    throw createError({
      statusCode: 409,
      statusMessage: 'Email already in use',
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
