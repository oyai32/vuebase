import GLOBAL from '../common/global.js'

const Mock = require('mockjs')

Mock.mock(GLOBAL.HOME + '/getUserInfo', /post|get/i, function (options) {
  let data = JSON.parse(options.body);
  // 模拟登录成功与失败
  if (data.username === 'admin') {
    return {
      state: 'success',
      'name': 'admin',
      'id': '1'
    }
  } else if (data.username === 'oyyl') {
    return {
      state: 'success',
      'name': '-D调定义之崽崽',
      'id': '2',
      theme: 'dark'
    }
  } else {
    return {
      state: 'error',
      message: '用户名/密码错误'
    }
  }
});

Mock.mock(GLOBAL.HOME + '/table/list', /post|get/i, function (options) {
  return [{
    id: '1',
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  }, {
    id: '2',
    date: '2016-05-02',
    name: '王小虎2',
    address: '上海市普陀区金沙江路 1518 弄'
  }, {
    id: '3',
    date: '2016-05-04',
    name: '王小虎3',
    address: '上海市普陀区金沙江路 1518 弄'
  }, {
    id: '4',
    date: '2016-05-01',
    name: '王小虎4',
    address: '上海市普陀区金沙江路 1518 弄'
  }, {
    id: '5',
    date: '2016-05-08',
    name: '王小虎5',
    address: '上海市普陀区金沙江路 1518 弄'
  }, {
    id: '6',
    date: '2016-05-06',
    name: '王小虎6',
    address: '上海市普陀区金沙江路 1518 弄'
  }, {
    id: '7',
    date: '2016-05-07',
    name: '王小虎7',
    address: '上海市普陀区金沙江路 1518 弄'
  }]
});

Mock.mock(GLOBAL.HOME + '/tree/first', /post|get/i, function (options) {
  return [{
    id: '1',
    name: '部门1'
  }, {
    id: '2',
    name: '部门2'
  }]
});

Mock.mock(GLOBAL.HOME + '/tree/list', /post|get/i, function (options) {
  let data = JSON.parse(options.body);
  if (data.id === 1) {
    return [{
      id: '11',
      name: '部门11',
      isLeaf: false
    }, {
      id: '21',
      name: '部门21',
      isLeaf: false
    }]
  } else {
    return [{
      id: '3',
      name: '李某某',
      isLeaf: true
    }, {
      id: '4',
      name: '杨某某',
      isLeaf: true
    }]
  }
});

Mock.mock(GLOBAL.HOME + '/tree/once', /post|get/i, function (options) {
  return [{
    id: 1,
    label: '一级 1',
    children: [{
      id: 4,
      label: '二级 1-1',
      children: [{
        id: 9,
        label: '三级 1-1-1'
      }, {
        id: 10,
        label: '三级 1-1-2'
      }]
    }]
  }, {
    id: 2,
    label: '一级 2',
    children: [{
      id: 5,
      label: '二级 2-1'
    }, {
      id: 6,
      label: '二级 2-2'
    }]
  }, {
    id: 3,
    label: '一级 3',
    children: [{
      id: 7,
      label: '二级 3-1'
    }, {
      id: 8,
      label: '二级 3-2'
    }]
  }]
});
