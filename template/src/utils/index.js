/**
 * Created by jiachenpan on 16/11/18.
 */

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
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ]; }
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  });
  return time_str;
}

export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time);
  const now = Date.now();

  const diff = (now - d) / 1000;

  if (diff < 30) {
    return '刚刚';
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前';
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前';
  } else if (diff < 3600 * 24 * 2) {
    return '1天前';
  }
  if (option) {
    return parseTime(time, option);
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    );
  }
}
/**
 * 按照需要将dataObj中数据赋值给aimObj
 * @param {*} dataObj
 * @param {*} aimObj
 */
export function copyToNeed(dataObj, aimKeys) {
  const obj = {};
  if (dataObj && aimKeys) {
    aimKeys.forEach(key => {
      if (dataObj.hasOwnProperty(key)) {
        if (dataObj[key] === '' || dataObj[key] === null) {
          obj[key] = '';
        } else {
          obj[key] = dataObj[key];
        }
      }
    });
  }
  return obj;
}
/**
 * 转换tree数据  列表格式-父子嵌套格式
 * @param {*} data
 */
export function formatTreeData(data) {
  const temp = {};
  const tree = {};
  for (const item of data) {
    temp[item.id] = item;
  }
  for (const key in temp) {
    if (temp[key].parentMenuId === -1) {
      tree[temp[key].id] = temp[key];
    } else if (temp[temp[key].parentMenuId]) {
      if (!temp[temp[key].parentMenuId].hasOwnProperty('children')) {
        temp[temp[key].parentMenuId].children = {};
      }
      temp[temp[key].parentMenuId].children[temp[key].id] = temp[key];
    }
  }
  return objToArr(tree);
  // // 一级菜单
  // const first = data.filter(obj => (obj.parentMenuId === -1));
  // data = data.filter(obj => (obj.parentMenuId !== -1));
  // // {firstid:[secondList]}
  // const mapData = {};
  // for (const obj of data) {
  //   if (obj.level !== 1) {
  //     if (!mapData.hasOwnProperty(obj.parentMenuId)) {
  //       mapData[obj.parentMenuId] = [];
  //     }
  //     mapData[obj.parentMenuId].push(obj);
  //   }
  // }
  // for (const obj of first) {
  //   if (mapData.hasOwnProperty(obj.id)) {
  //     obj.children = mapData[obj.id];
  //   }
  // }
  // return first;
}
// 将formatTreeData中转换好的object层级关系转为数组层级关系
function objToArr(data) {
  const parent = [];
  for (const key in data) {
    const node = Object.assign({}, data[key]);
    if (node.hasOwnProperty('children')) {
      node.children = objToArr(node.children);
    }
    parent.push(node);
  }
  return parent;
}
export function getParams(url, variable) {
  const query = url.substring(url.indexOf('?') + 1);
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    if (pair[0] === variable) { return pair[1]; }
  }
  return (false);
}
// 通过url 获取videoId和文件类型
// .m3u8 || .mpd  type="application/x-mpegURL"
// .mp4       type="video/mp4"
// export function videoInfo(url) {
//   if (!url) {
//     return false;
//   }
//   let Suffix = '';
//   if (url.indexOf('.') > -1) {
//     Suffix = url.substring(url.lastIndexOf('.') + 1);
//   }
//
//   return (Suffix === 'mp4') ? 'video/mp4' : 'application/x-mpegURL';
// }
// export function videoInfo(url) {
//   if (!url) {
//     return false;
//   }
//   let Suffix = '';
//   if (url.indexOf('.') > -1) {
//     Suffix = url.substring(url.lastIndexOf('.') + 1);
//   }
//
//   const type = (Suffix === 'mp4') ? 'video/mp4' : 'application/x-mpegURL';
//   const videoId = getParams(url, 'v');
//   return {
//     type: type,
//     videoId: videoId
//   };
// }

/**
 * 将时间字符串转换成时间戳
 */
export function getTimeStamp(date) {
  const invalidDates = [undefined, null, '', 0];
  const formate = d => new Date(d).getTime();
  if (invalidDates.includes(date)) {
    return null;
  } else {
    switch (typeof date) {
      case 'number':
        return date;
      default:
        return formate(date);
    }
  }
}
