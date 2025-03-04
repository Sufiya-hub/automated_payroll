import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { googleLogin } from '@/server/queries';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SCERET,
    }),
  ],
  pages: {
    signIn: '/',
    error: '/auth/error',
  },
  callbacks: {
    async signIn({ profile }) {
      if (!profile?.email) {
        return false;
      }

      try {
        const userExists = await googleLogin(profile.email);
        if (userExists) {
          profile.id = userExists.id;
          profile.position = userExists.position;
          return true;
        }
      } catch (error) {
        console.error('Login verification error:', error);
        return false;
      }
    },
    async session({ token, session }) {
      session.user.position = token.position;
      session.user.id = token.id;
      console.log('session:', session?.user);
      return session;
    },

    async jwt({ profile, token }) {
      if (profile) {
        token.position = profile.position;
        token.id = profile.id;
      }
      // console.log(token);
      return token;
    },

    async redirect({ url, baseUrl }) {
      return `${baseUrl}/login`;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
