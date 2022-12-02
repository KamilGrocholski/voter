// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { exampleRouter } from "./example";
import { authRouter } from "./auth";
import { voteSetRouter } from "./vote-set";
import { voteRouter } from "./vote";
import { voteItemRouter } from './vote-item'
import { userRouter } from "./user";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  voteSet: voteSetRouter,
  vote: voteRouter,
  voteItem: voteItemRouter,
  user: userRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
