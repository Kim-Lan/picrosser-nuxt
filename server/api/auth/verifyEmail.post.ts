import jwt from 'jsonwebtoken';
import { User } from '~/server/models/User';

function verifyToken(token) {
  return jwt.verify(token, useRuntimeConfig().authEmailVerificationSecret);
}

export default defineEventHandler(async (event) => {
  const { token } = await readBody(event);

  const { email, verificationToken} = verifyToken(token);

  const user = await User.findOne({ email });
  if (!user) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
  if (user.verificationToken && user.verificationToken === verificationToken) {
    user.isVerified = true;
    user.save();
  }
  console.log(user.isVerified);
})
