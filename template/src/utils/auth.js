import Cookies from 'js-cookie'

{{#zeusEx}}
const FromKey = 'St-vue-From';
export function getFrom() {
  return Cookies.get(FromKey);
}

export function setFrom(from) {
  return Cookies.set(FromKey, from);
}
{{/zeusEx}}

const TokenKey = 'ST_VUE-TOKEN'

export function getToken() {
  return Cookies.get(TokenKey)
  // if (process.env.NODE_ENV === 'production') {
  //   return Cookies.get(TokenKey)
  // } else {
  //   return true
  // }
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}


