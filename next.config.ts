import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Produce a fully static site in /out for upload to Cloudways.
  output: "export",
  // Static hosting can't run the Next.js image optimizer.
  images: { unoptimized: true },
  // Cleaner URLs as static folders (e.g. /work/ -> /work/index.html).
  trailingSlash: true,
};

export default nextConfig;
