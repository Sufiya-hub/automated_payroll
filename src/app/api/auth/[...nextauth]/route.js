import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { googleLogin } from '@/server/queries';

const authOptions = {
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
      console.log('profile:', profile);
      if (!profile?.email) {
        return false;
      }
      const userExists = await googleLogin(profile.email);
      if (userExists) return true;
      return false;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
