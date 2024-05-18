import crypto from 'crypto';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import { User } from '~/server/models/User';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'picrosser.com@gmail.com',
    pass: useRuntimeConfig().googleAppPassword,
  },
});

const EXPIRE_SPAN = 1000 * 60 * 60 * 24; // one day

function generateVerificationToken() {
  return crypto.randomBytes(30).toString('hex');
}

function getVerificationTokenExpire() {
  return new Date(Date.now() + EXPIRE_SPAN);
}

function signVerificationToken(email, verificationToken) {
  return jwt.sign({
    email,
    verificationToken
  },
    useRuntimeConfig().authEmailVerificationSecret,
  );
}

export default defineEventHandler(async (event) => {
  const { email } = await readBody(event);

  if (!email) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing email',
    })
  }

  const user = await User.findOne({ email });
  if (!user || !user.isVerified) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Something Went Wrong',
    })
  }

  let token = user.verificationToken;
  if (!user.resetPassword || !token || user.verificationTokenExpire < Date.now()) {
    token = generateVerificationToken();
    const expire = getVerificationTokenExpire();

    user.verificationToken = token;
    user.verificationTokenExpire = expire;
    user.resetPassword = true;
    user.save();
  }
  const jwt = signVerificationToken(email, token);

  const { info, err } = await transporter.sendMail({
    from: '"Picrosser" <picrosser.com@gmail.com>',
    to: email,
    subject: '[Picrosser] Reset Password',
    text: `Picrosser\n\nPlease follow this link to reset your password. Link expires in 24 hours.\n\nhttps://picrosser.com/login/reset/${jwt}`,
    html: `<h1>Picrosser</h1><p>Please follow this link to reset your password. Link expires in 24 hours.</p><p><a href="https://picrosser.com/login/reset/${jwt}">https://picrosser.com/login/reset/${jwt}</a></p>`,
  });
  if (err) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }

  return 'Password reset email sent';
})
