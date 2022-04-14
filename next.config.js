module.exports = {
  async redirects() {
    return [
      {
        source: '/messagebox',
        destination: '/messagebox',
        permanent: false,
      },
    ]
  },
}
