// 根据 process.env.HOST 的值判断当前是什么环境,host配置在 config下的dev.env.js和prod.env.js
// 如命令：npm run build -- test ，process.env.HOST就为：'test'
// 如命令：npm run dev  ，process.env.HOST就为：'dev'
// 如命令：npm run build  ，process.env.HOST就为：'prod'

const HOST = process.env.HOST;

const URL_CONFIG = {
  'dev': {
    home: 'http://172.1.1.0/dev'
  },
  'test': {
    home: 'http://172.1.1.0/test'
  },
  'prod': {
    home: 'http://172.1.1.0/prod'
  }
}

let {home} = URL_CONFIG[HOST]

export default {
  HOME: home
}
