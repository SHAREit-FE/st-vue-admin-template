const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  routers: (state) => state.user.routers,
  avatar: (state) => state.user.avatar,
  language: state => state.app.language
};
export default getters;
