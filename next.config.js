/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: () => {
    return [{
      source: '/api/seeds',
      destination: '/api/seeds'
    }]
  },
  serverRuntimeConfig: {
    apiTimeout: 30000, // Tempo limite em milissegundos (30 segundos, por exemplo)
  },
}

module.exports = nextConfig
