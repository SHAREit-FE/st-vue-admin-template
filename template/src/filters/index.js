// 时间戳格式转化为 yyyy-mm-dd hh:mm:ss
export function dataTime(timeStamp) {
  const date = new Date(timeStamp);
  const y = date.getFullYear();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  let m = date.getMonth() + 1;
  let d = date.getDate();
  let h = date.getHours();
  m = m < 10 ? ('0' + m) : m;
  d = d < 10 ? ('0' + d) : d;
  h = h < 10 ? ('0' + h) : h;
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
}
// 根据时间戳计算时长
export function duration(timeStamp) {
  let hour = parseInt((timeStamp % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minute = parseInt((timeStamp % (1000 * 60 * 60)) / (1000 * 60));
  let second = parseInt((timeStamp % (1000 * 60)) / 1000);
  hour = hour < 10 ? ('0' + hour) : hour;
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  return hour + ':' + minute + ':' + second;
}
// UTC 格式转化为 yyyy-mm-dd hh:mm:ss
export function formatUTC(UTCTime) {
  const date = new Date(UTCTime);
  const y = date.getUTCFullYear();
  let m = date.getUTCMonth() + 1;
  let d = date.getUTCDate();
  let h = date.getUTCHours();
  let minute = date.getUTCMinutes();
  let second = date.getUTCSeconds();
  m = m < 10 ? ('0' + m) : m;
  d = d < 10 ? ('0' + d) : d;
  h = h < 10 ? ('0' + h) : h;
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
}
/**
 * 通过val匹配与arr中与valueKey的值相同的数据，并返回labelKey对应的值
 * @param {*} arr 数据列表
 * @param {*} val 值
 * @param labelKey 需要返回的数据key 默认为 label
 * @param valueKey  val对应的数据key 默认为 value
 */
export function valueToLabel(val, arr, labelKey, valueKey) {
  let label = '';
  if (val === '' || val === null || !(arr instanceof Array) || arr.length === 0) {
    return '';
  }
  labelKey = labelKey || 'label';
  valueKey = valueKey || 'value';
  const item = arr.find(obj => obj[valueKey] === val);
  if (item && item[labelKey] !== undefined) {
    label = item[labelKey];
  } else {
    label = '';
  }
  return label;
}

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000;
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value];
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  });
  return time_str;
}

// 处理返回数据被引号包裹的数组
export function changeJsonArr(string) {
  if (string.length === 0) {
    return null
  } else {
    return JSON.parse(string).join(' , ')
  }
}
