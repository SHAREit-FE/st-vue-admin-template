import request from '@/utils/request'

/**
 * get user info
 */
export function getInfo() {
  return request({
    url: '/systemuserinfo/remote',
    method: 'get'
  })
}
/**
 * logout
 */
export function logout() {
  return request({
    url: '/systemlogout/remote',
    method: 'get'
  })
}

/**
 * get user menu
 */
export function getMenu() {
  return request({
    url: '/systemmenu/remote',
    method: 'get'
  })
}

