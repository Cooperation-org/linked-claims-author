/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['drive.google.com', 'res.cloudinary.com', 'live.linkedtrust.us']
  },
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'drive.usercontent.google.com',
      port: '',
      pathname: '/download/**'
    }
  ]
}

export default nextConfig
