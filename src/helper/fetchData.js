const getJson = async (URL) => {
  return fetch(URL).then((res) => res.json());
};

module.exports = {
  getJson,
};
