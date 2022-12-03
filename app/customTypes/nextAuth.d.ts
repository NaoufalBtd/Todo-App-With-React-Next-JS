import {DefaultSession,Session} from "next-auth";

declare module "next-auth" {
  export interface Session {
    user?: {
      id: string | null;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}
