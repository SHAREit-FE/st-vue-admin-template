module.exports = {
  prompts: {
    name: {
      type: 'string',
      required: true,
      message: 'Project name'
    },
    version: {
      type: 'string',
      required: true,
      message: 'Project version',
      default: '1.0.0'
    },
    description: {
      type: 'string',
      required: false,
      message: 'Project description',
      default: 'A easyify H5 project'
    },
    author: {
      type: 'string',
      required: false,
      message: 'Author'
    },
    title: {
      type: 'string',
      message: 'home page title',
      default: 'page title'
    },
    // 是否开通外网访问
    zeusEx: {
      type: 'confirm',
      message: 'Open external network access?',
      default: false
    },
    useVideo: {
      type: 'confirm',
      message: 'Do you need a player?',
      default: false
    }
  },
  filters: {
    'src/components/videoPlayer/**': 'useVideo'
  },
  skipInterpolation: [
    'src/components/**'
  ],
  completeMessage: 'You can edit your code ASAP!\n\n Enjoy your life!~~'
};