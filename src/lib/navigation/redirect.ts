const AUTH_ROUTES = ["/sign-in", "/sign-up"];
const INTERNAL_ORIGIN = "http://fixmate.internal";

export const getSafeRedirect = (
  value: string | string[] | undefined,
  fallback = "/",
) => {
  const raw = (Array.isArray(value) ? value[0] : value)?.trim();
  if (!raw) return fallback;

  try {
    const url = new URL(raw, INTERNAL_ORIGIN);

    if (url.origin !== INTERNAL_ORIGIN) return fallback;
    if (
      AUTH_ROUTES.some(
        (route) =>
          url.pathname === route || url.pathname.startsWith(`${route}/`),
      )
    ) {
      return fallback;
    }

    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return fallback;
  }
};

/** Builds an auth page href that preserves where the user was heading. */
export const getAuthHref = (
  path: "/sign-in" | "/sign-up",
  redirect?: string,
) => {
  const target = getSafeRedirect(redirect);
  return target === "/"
    ? path
    : `${path}?redirect=${encodeURIComponent(target)}`;
};

/** Returns the role-safe destination after any authentication method. */
export const getPostAuthDestination = (
  role: string | null | undefined,
  redirect?: string,
) => {
  if (role === "technician") return "/dashboard/technician";
  if (role === "admin") return "/dashboard/admin";
  const safeRedirect = getSafeRedirect(redirect);
  if (safeRedirect === "/dashboard") return "/dashboard/customer";
  return safeRedirect.startsWith("/dashboard/") ? "/" : safeRedirect;
};
