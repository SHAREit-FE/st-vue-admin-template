
import axios from '@/utils/request';

/**
 * @name 获取一级标签列表
 */
export function getFirstLabels() {
  return axios.get('');
}

/**
 * @name 获取子垂类标签
 */
export function getSecondLabels(params) {
  return axios.get('', { params: { ...params }});
}

/**
 * @name 获取关键词列表
 */
export function getKeywords(params) {
  return axios.get('', { params: { ...params }});
}
