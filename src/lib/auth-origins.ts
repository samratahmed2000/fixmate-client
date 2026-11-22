const LOOPBACK_URL =
  /^https?:\/\/(?:localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\])(?::\d+)?\/?$/i;

type Env = Record<string, string | undefined>;

const toOrigin = (value?: string) => {
  if (!value) return null;

  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
};

const getVercelOrigins = (env: Env) =>
  [env.VERCEL_PROJECT_PRODUCTION_URL, env.VERCEL_BRANCH_URL, env.VERCEL_URL]
    .filter((host): host is string => Boolean(host))
    .map((host) => `https://${host.replace(/^https?:\/\//, "")}`);

export const getAuthBaseURL = (env: Env = process.env) => {
  const configured = env.BETTER_AUTH_URL?.trim();

  // A loopback URL is a local development value, never a deployed one.
  if (configured && !LOOPBACK_URL.test(configured)) return configured;

  const [vercelOrigin] = getVercelOrigins(env);

  return vercelOrigin ?? configured ?? "http://localhost:3000";
};

export const getTrustedOrigins = (env: Env = process.env) => {
  const origins = [
    getAuthBaseURL(env),
    env.BETTER_AUTH_URL,
    env.NEXT_PUBLIC_APP_URL,
    ...getVercelOrigins(env),
  ]
    .map(toOrigin)
    .filter((origin): origin is string => Boolean(origin));

  return [...new Set(origins)];
};
