import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // Better Auth automatically infers the base URL on the client-side,
  // but we can also set process.env.BETTER_AUTH_URL if needed.
});
