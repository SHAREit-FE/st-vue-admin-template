export default {
  data: {
    status: [{
      label: 'Invalid',
      value: 0
    }, {
      label: 'Valid',
      value: 1
    }],
    boolean: [{
      label: 'Yes',
      value: true
    }, {
      label: 'No',
      value: false
    }],
    booleanNum: [{
      label: 'Yes',
      value: 1
    }, {
      label: 'No',
      value: 0
    }],
    // 答题详情页状态
    videoStatus: [
      {
        value: 1,
        label: 'online'
      },
      {
        value: 2,
        label: 'offline'
      }
    ],
    // 是否低龄
    childOpts: [{
      value: 0,
      label: 'general'
    }, {
      value: 1,
      label: 'kids'
    }, {
      value: 2,
      label: 'adult'
    }]
  }
};
