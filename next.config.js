/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: () => {
    return [{
      source: '/api/seeds',
      destination: '/api/seeds'
    }]
  }
}

module.exports = nextConfig
