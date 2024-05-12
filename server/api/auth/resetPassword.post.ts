import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '~/server/models/User';

function verifyToken(token) {
  return jwt.verify(token, useRuntimeConfig().authEmailVerificationSecret);
}

export default defineEventHandler(async (event) => {
  const { token, newPassword } = await readBody(event);

  const { email, verificationToken } = verifyToken(token);

  const user = await User.findOne({ email });
  if (!user) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }

  const isResetting = user.resetPassword;
  if (!isResetting) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }
  if (user.verificationTokenExpire < Date.now()) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Token Expired',
    })
  }
  if (isResetting && user.verificationToken && user.verificationToken === verificationToken) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    user.resetPassword = false;
    user.save();
  }
  return isResetting && !user.resetPassword;
})
