import { logout, getInfo, getMenu } from '@/api/user';
import { getToken, setToken, removeToken, setFrom } from '@/utils/auth';
import { constantRoutes, asyncRouterMap } from '@/router';
import router from '@/router';
const session = sessionStorage;
const router_key = 'SHAREit_ROUTER';

const state = {
  token: getToken(),
  userInfo: '',
  avatar: '',
  routers: []
};
// getters
const getters = {
  token: (state) => state.token,
  routers: (state) => state.routers
};
const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_INFO: (state, user) => {
    state.userInfo = user;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROUTERS: (state, routers) => {
    router.addRoutes(routers);
    state.routers = constantRoutes.concat(routers);
  }
};

const actions = {
  // user login
  Login({ commit }, query) {
    return new Promise((resolve, reject) => {
      setToken(query.t);
      setFrom(query.f);
      commit('SET_TOKEN', query.t);
      resolve();
    });
  },

  // get user info
  GetInfo({ commit, state }) {
    if (process.env.NODE_ENV === 'production') {
      return new Promise((resolve, reject) => {
        getInfo().then(res => {
          if (res.success) {
            const data = res.data;
            commit('SET_INFO', data);
            resolve();
          } else {
            reject(res);
          }
        }).catch(error => {
          reject(error);
        });
      });
    }
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then((res) => {
        commit('SET_TOKEN', '');
        commit('SET_INFO', '');
        session.removeItem(router_key);
        removeToken();
        resolve();
      }).catch(error => {
        reject(error);
      });
    });
  },
  // 前端 登出
  FedLogOut({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '');
      commit('SET_INFO', '');
      session.removeItem(router_key);
      removeToken();
      resolve();
    });
  },
  InitRouters({ commit, state }) {
    return new Promise((resolve, reject) => {
      console.log(process.env.NODE_ENV);
      if (process.env.NODE_ENV === 'production') {
        const json = JSON.parse(session.getItem(router_key));
        if (json) {
          commit('SET_ROUTERS', filterRouter(json));
          resolve();
        } else {
          getMenu().then(res => {
            if (res.success) {
              commit('SET_ROUTERS', filterRouter(res.data));
              if (res.data.length > 0) {
                session.setItem(router_key, JSON.stringify(res.data));
              }
              resolve();
            }
          }).catch(error => {
            reject(error);
          });
        }
      } else {
        commit('SET_ROUTERS', asyncRouterMap);
        resolve();
      }
    });
  },
  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '');
      removeToken();
      resolve();
    });
  }
};
/**
 * 通过后台获取的菜单列表过滤路由并注入
 * @param {*} menuArr
 */
function filterRouter(menuArr) {
  const urlArr = [];
  for (const menu of menuArr) {
    urlArr.push(menu.url);
  }
  function recursion(async, parent) {
    const newRouter = [];
    for (const router of async) {
      if (urlArr.indexOf(router.path) > -1 || urlArr.indexOf(router.redirect) > -1 || (parent && urlArr.indexOf(parent.path + '/' + router.path) > -1)) {
        const r = Object.assign({}, router);
        if (router.hasOwnProperty('children')) {
          r.children = recursion(router.children, router);
        }
        newRouter.push(r);
      }
    }
    return newRouter;
  }
  const lastRouter = recursion(asyncRouterMap);
  // 最后添加404
  lastRouter.push({
    path: '*',
    redirect: '/404'
  });
  return lastRouter;
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

