/** @type {import('next').NextConfig} */
const nextConfig = {
   experimental: { outputFileTracingIncludes: { "/api/**/*": ["./node_modules/**/*.wasm"], }, }
};

export default nextConfig;
