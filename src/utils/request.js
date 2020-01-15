import axios from 'axios';
import { Message } from 'element-ui';
import store from '@/store';
import { getToken, getFrom } from '@/utils/auth';
import encode from 'urlencode';

// create an axios instance
const service = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? process.env.VUE_APP_BASE_API : process.env.VUE_APP_API_PATH, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 15000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters['user/token']) {
      config.headers['Authentication'] = getToken(); // 让每个请求携带自定义token
    }
    return config;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    // 请求出错后的处理
    const res = response.data;
    // 用于业务相关接口错误提示
    if (!res.success && res.returnCode && res.returnCode === '10004') {
      store.dispatch('user/FedLogOut').then(() => {
        const from = getFrom();
        if (from && from === 'zeus') {
          window.location.href = process.env.VUE_APP_ZEUS_PATH + '?from=' + encode(window.location.href);
        } else {
          window.location.href = process.env.VUE_APP_ZEUS_EX_PATH + '?from=' + encode(window.location.href);
        }
      });
      return;
    }
    if (response.config.responseType === 'blob') {
      return response;
    }
    return res;
  },
  error => {
    console.log('err' + error); // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
