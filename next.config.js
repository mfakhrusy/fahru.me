module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/boot-up",
        permanent: true,
      },
    ];
  },
};
