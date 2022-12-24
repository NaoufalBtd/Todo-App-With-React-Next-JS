/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    DATABASE_URL:
      "postgres://naoufel.info3:d0zOP3EGutaB@ep-spring-paper-972913.eu-central-1.aws.neon.tech/neondb",
    NEXTAUTH_SECRET: "MoIOAuAlsFAbYRmzQpXJOtevJsXY8/BWQA3XFflllTw=",
  },
};

module.exports = nextConfig;
