import { User } from '~/server/models/User';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'picrosser.com@gmail.com',
    pass: useRuntimeConfig().googleAppPassword,
  },
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.username || !body.email || !body.password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields',
    })
  }

  const existingUser = await User.findOne({ username: { '$regex': body.username, $options: 'i' }});
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

  const info = await transporter.sendMail({
    from: '"Picrosser" <picrosser.com@gmail.com>',
    to: body.email,
    subject: '[Picrosser] Successfully Registered',
    text: `Welcome to Picrosser! \n\nYou have successfully registered with username: ${body.username}`,
    html: `<h1>Welcome to Picrosser!</h1><p>You have successfully registered with username: ${body.username}</p>`
  });

  return {
    id: user._id,
    email: user.email,
    username: user.username,
  };
})
