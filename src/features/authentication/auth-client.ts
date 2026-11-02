import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { env } from "@/config/env";

/**
 * BetterAuth client. Authentication is hosted by the Express backend under
 * `/api/auth`; the SPA never talks to the database directly.
 *
 * Session data is stored in httpOnly cookies (BetterAuth default), so no token
 * is persisted in localStorage.
 */
export const authClient = createAuthClient({
  baseURL: env.authUrl,
  fetchOptions: {
    credentials: "include",
  },
  plugins: [
    inferAdditionalFields({
      user: {
        isOnboarded: {
          type: "boolean",
          required: false,
          input: true,
        },
        globalRoleId: {
          type: "string",
          required: false,
        },
      },
    }),
  ],
});
