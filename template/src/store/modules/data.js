import * as func from '@/api/data';
const ss = sessionStorage;

const keys = {
  SET_COUNTRYS: 'ST_LANGUAGES',
  SET_LANGUAGES: 'ST_COUNTRYS',
  SET_VERTICAL_LABEL: 'ST_VERTICAL_LABEL'
};
const funcList = {
  SET_COUNTRYS: func.getCountrys,
  SET_LANGUAGES: func.getLanguages,
  SET_VERTICAL_LABEL: func.getVerticalLabel
};
// state
const state = {
  countrys: [],
  languages: [],
  verticalLabels: []
};

// getters
const getters = {
  countrys: (state) => state.countrys,
  languages: (state) => state.languages,
  verticalLabels: (state) => state.verticalLabels
};

// mutations
const mutations = {
  SET_COUNTRYS(state, data) {
    state.countrys = data;
  },
  SET_LANGUAGES(state, data) {
    state.languages = data;
  },
  SET_VERTICAL_LABEL(state, data) {
    state.verticalLabels = data;
  }
};

// actions
const actions = {
  // 初始化查询信息
  initQuery({ commit }, key) {
    if (!keys[key] || !funcList[key]) {
      return false;
    }

    const json = ss.getItem(keys[key]);
    if (json) {
      commit(key, JSON.parse(json));
    } else {
      let func = funcList[key];
      let params = {};
      if (funcList[key].func) {
        func = funcList[key].func;
        params = funcList[key].params;
      }
      func(params).then((res) => {
        const data = res.data;
        if (data && data.length > 0) {
          commit(key, data);
          ss.setItem(keys[key], JSON.stringify(data));
        }
      });
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
