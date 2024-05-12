import { NuxtAuthHandler } from '#auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { User } from '~/server/models/User';
import bcrypt from 'bcrypt';

export default NuxtAuthHandler({
  secret: useRuntimeConfig().authSecret,
  pages: {
    signIn: '/login',
  },
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    CredentialsProvider.default({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized'
          });
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);

        if (!isValid) {
          throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized'
          });
        }

        return {
          ... user.toObject(),
          password: undefined,
        };
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token = {
          ... token,
          ... user
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ... token,
        ... session.user
      }
      return session;
    },
  },
})
