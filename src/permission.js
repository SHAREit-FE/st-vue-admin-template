import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken, getFrom } from '@/utils/auth' // get token from cookie
import encode from 'urlencode'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async(to, from, next) => {
  if (to.query && to.query.t) {
    store.dispatch('user/Login', to.query).then(() => {
      delete to.query.t
      delete to.query.f
      next({ path: to.path, replace: true, query: to.query })
    })
  } else {
    NProgress.start()
    if (getToken()) {
      // 刷新页面初始化用户信息
      if (!store.getters.userInfo && to.matched.length > 0) {
        store.dispatch('user/GetInfo')
      }
      // 刷新页面时先挂载路由
      if (store.getters['user/routers'].length === 0) {
        store.dispatch('user/InitRouters').then(res => {
          // 刷新页面时由于路由开始未挂载所有路由 导致会直接重定向到404，这里挂载完后replace到正确的path
          if (to.path === '/404') {
            next({
              path: to.redirectedFrom,
              replace: true
            })
          } else {
            next(to.fullPath)
          }
        }).catch(error => {
          next()
          console.log(error)
        })
      } else {
        if (!to.matched || to.matched.length === 0) {
          Message({
            center: true,
            type: 'warning',
            message: '权限不足'
          })
          NProgress.done()
        } else {
          next()
        }
      }
    } else {
      const from = getFrom();
      if (from && from === 'zeus') {
        window.location.href = process.env.VUE_APP_ZEUS_PATH + '?from=' + encode(window.location.href);
      } else {
        window.location.href = process.env.VUE_APP_ZEUS_EX_PATH + '?from=' + encode(window.location.href);
      }
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
