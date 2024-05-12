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

  if (user.isVerified) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User is already verified',
    })
  }

  let token = user.verificationToken;
  if (!token || user.verificationTokenExpire < Date.now()) {
    token = generateVerificationToken();
    const expire = getVerificationTokenExpire();

    user.verificationToken = token;
    user.verificationTokenExpire = expire;
    user.save();
  }
  const jwt = signVerificationToken(email, token);


  const { info, err } = await transporter.sendMail({
    from: '"Picrosser" <picrosser.com@gmail.com>',
    to: email,
    subject: '[Picrosser] Verify Email',
    text: `Picrosser\n\nPlease follow this link to verify your email. Link expires in 24 hours.\n\nhttp://localhost:3000/verify/${jwt}`,
    html: `<h1>Picrosser</h1><p>Please follow this link to verify your email. Link expires in 24 hours.</p><p><a href="http://localhost:3000/verify/${jwt}">http://localhost:3000/verify/${jwt}</a></p>`,
  });
  if (err) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    })
  }

  return 'Verification email sent';
})
