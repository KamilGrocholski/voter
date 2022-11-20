import { DefaultSession } from "next-auth";
import { Role } from "../components/common/Header/components/LoggedInLinks";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: {
      id: string;
    } & DefaultSession["user"]
    & { role: Role };
  }
}
