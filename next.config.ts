import type { NextConfig } from "next";

/** Basic hardening headers for every page */
const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  // Web3Forms only accepts messages sent from the visitor's browser on its free plan, so the
  // contact form posts straight to it. Its access key is public by design: it can only send
  // mail to the inbox it belongs to. The value is copied from WEB3FORMS_ACCESS_KEY at build time.
  env: {
    NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY:
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? process.env.WEB3FORMS_ACCESS_KEY ?? "",
  },
  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
  // Kaar.af was renamed Abaseen on 2026-11-08; keep the old project address working.
  async redirects() {
    return [{ source: "/projects/kaar", destination: "/projects/abaseen", permanent: true }];
  },
};

export default nextConfig;
