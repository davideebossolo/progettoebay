// tokenStore.js
let accessToken = null;
module.exports = {
  set: (t) => { accessToken = t; },
  get: () => accessToken,
};
