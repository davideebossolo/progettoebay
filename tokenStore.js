// tokenStore.js
let accessToken = null;

module.exports = {
  set: (token) => { accessToken = token; },
  get: () => accessToken,
};
