import type { MetadataRoute } from "next";

/**
 * No sitemap directive here on purpose: that requires an absolute canonical
 * URL, and the firm's production domain isn't confirmed anywhere in this
 * codebase yet (see site.ts), inventing one would violate the same rule
 * that keeps site.email empty. Add `sitemap:` once it is.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The design-system review route, never meant to be indexed, and
      // already marked noindex in its own metadata (belt and suspenders).
      disallow: ["/styleguide"],
    },
  };
}
