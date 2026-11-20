import { cache } from "react";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { isRole } from "@/lib/dashboard/MenuItemsByRole";
import { DashboardUser } from "@/types/dashboard";

/**
 * Reads the session on the server so the dashboard shell renders with the
 * signed-in user's menu on the first paint, instead of waiting for the
 * client-side `useSession()` fetch and flashing an empty/skeleton sidebar.
 *
 * `cache()` dedupes the read when both the header and the sidebar need it.
 */
export const getDashboardUser = cache(
  async (): Promise<DashboardUser | null> => {
    // Read the request outside the try/catch: Next.js signals "this render is
    // dynamic" by throwing here during prerendering, and catching that would
    // make the framework bake the skeleton fallback into the static shell.
    const requestHeaders = await headers();

    try {
      const session = await auth.api.getSession({ headers: requestHeaders });
      const user = session?.user;

      if (!user) {
        return null;
      }

      return {
        name: user.name ?? null,
        email: user.email ?? null,
        image: user.image ?? null,
        role: isRole(user.role) ? user.role : null,
      };
    } catch {
      // An unreachable session store must not take the whole dashboard down;
      // the client-side session read can still fill the shell in.
      return null;
    }
  },
);
