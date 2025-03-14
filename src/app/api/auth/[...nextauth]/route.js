import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { googleLogin, login } from '@/server/queries';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SCERET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'you@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log('creds:', credentials);
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing email or password');
        }

        try {
          const user = await login(credentials.email, credentials.password);
          if (user) {
            return {
              id: user.id.toString(),
              email: user.email,
              position: user.position,
              image: user.image,
              name: user.fullName,
              salary: user.salary,
            };
          } else {
            // console.log('hheacj');
            throw new Error('Invalid credentials');
          }
        } catch (error) {
          console.error('Authorization error:', error);
          throw new Error('Login failed');
        }
      },
    }),
  ],
  pages: {
    signIn: '/',
    error: '/auth/error',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        if (!profile?.email) return false;
        try {
          const userExists = await googleLogin(profile.email);
          if (userExists) {
            user.id = userExists.id;
            user.position = userExists.position;
            user.image = userExists.image;
            user.name = userExists.fullName;
            user.salary = userExists.salary;
          }
        } catch (error) {
          console.error('Google login error:', error);
          return false;
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.position = token.position;
        session.user.image = token.image;
        session.user.name = token.name;
        session.user.salary = token.salary;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.position = user.position;
        token.image = user.image;
        token.name = user.name;
        token.salary = user.salary;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/login`;
    },
  },
  session: {
    strategy: 'jwt',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
