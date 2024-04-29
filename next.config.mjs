
/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    images: {
        remotePatterns: [{
            hostname: "*"
        }]

    }
};

export default nextConfig;
