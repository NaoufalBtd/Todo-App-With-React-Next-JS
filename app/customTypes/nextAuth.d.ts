import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  export interface Session {
    user?: {
      id: string | null;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      fullName?: string | null | JWT;
    };
  }
  export interface User extends DefaultUser {
    fullName?: string | null;
  }
}

declare module "next-auth/jwt" {
  export interface JWT extends DefaultJWT {
    id: string | null;
  }
}
