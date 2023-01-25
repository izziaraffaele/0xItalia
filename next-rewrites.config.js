module.exports = async function rewrites() {
  return [
    {
      source: '/collections/:type',
      destination: '/projects?type=:type',
    },
  ];
};
