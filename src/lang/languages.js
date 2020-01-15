function getCache(r) {
  let cache = {};
  r.keys().forEach(key => {
    cache = Object.assign(cache, r(key).default);
  });

  return cache;
}

const en = getCache(require.context('./en', true, /(?<!index)\.js$/));
const zh = getCache(require.context('./zh', true, /(?<!index)\.js$/));

export {
  en,
  zh
};
