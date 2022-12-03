import axios from "axios";
import NextAuth, { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  session: {
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await axios.post<IUser>(
          "http://localhost:3000/api/login",
          {
            email: credentials?.email,
            password: credentials?.password,
          },
          {
            headers: {
              accept: "*/*",
              "Content-Type": "application/json",
            },
          }
        );
        const user = res.data.payload;
        if (user && res) {
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      if (user) {
        token.email = user.email;
        token.id = user.id;
        token.name = user.fullName;
      }
      return token;
    },
    async session({ token, session }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
      }
      return session;
    },
  },
});

interface IUser {
  payload: {
    id: number;
    email: string;
    password: string;
  };
}

interface IJWT extends JWT {
  id?: number;
}
interface ISession extends Session {
  user: {
    name?: string;
    email: string;
    id?: number;
  };
}
