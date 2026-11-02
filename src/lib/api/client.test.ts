import axios from "axios";
import { describe, expect, it } from "vitest";
import { env } from "@/config/env";
import { getApiErrorMessage } from "@/lib/api/client";
import { getBackendURL } from "@/lib/api/backend-url";

describe("api configuration", () => {
  it("resolves the backend URL from the Vite environment", () => {
    expect(getBackendURL()).toBe(env.apiUrl);
  });

  it("defaults the auth URL to the API /auth mount", () => {
    expect(env.authUrl.endsWith("/auth")).toBe(true);
  });

  it("sends cookies with every axios request", () => {
    expect(axios.defaults.withCredentials).toBe(true);
  });
});

describe("getApiErrorMessage", () => {
  it("prefers the backend message", () => {
    const error = new axios.AxiosError(
      "Request failed",
      "400",
      undefined,
      undefined,
      {
        data: { message: "Invalid credentials" },
      } as never
    );

    expect(getApiErrorMessage(error)).toBe("Invalid credentials");
  });

  it("falls back to the error name for non-axios errors", () => {
    expect(getApiErrorMessage(new Error("boom"))).toBe("boom");
  });

  it("returns the provided fallback for unknown values", () => {
    expect(getApiErrorMessage("nope", "fallback")).toBe("fallback");
  });
});
