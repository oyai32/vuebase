import moment from 'moment'
import 'moment/locale/zh-cn'
import {Message} from 'element-ui';

// 处理时间戳
export const dealTimestamp = (timestamp, formatter = 'YYYY-MM-DD HH:mm:ss') => {
  if (timestamp) {
    return moment(Number(timestamp)).format(formatter)
  } else {
    return ''
  }
}

// 处理Date时间格式
export const dealDate = (date, formatter = 'YYYY-MM-DD HH:mm:ss') => {
  if (date) {
    return moment(date).format(formatter)
  } else {
    return ''
  }
}

// 获取地址栏参数
export const getUrlParam = (paraName) => {
  var url = document.location.toString();
  var arrObj = url.split('?');
  if (arrObj.length > 1) {
    var arrPara = arrObj[1].split('&');
    var arr;
    for (var i = 0; i < arrPara.length; i++) {
      arr = arrPara[i].split('=');

      if (arr != null && arr[0] === paraName) {
        return arr[1];
      }
    }
    return '';
  } else {
    return '';
  }
}

/**
 * 提示框
 * @param text
 * @param type（error warning info 默认是success)
 */
export const showMsg = (text, type = 'success') => {
  Message({
    showClose: true,
    message: text,
    type: type,
    duration: 2000
  })
}

/**
 * 将时间数组割成开始时间和结束时间
 */
export const dealTimeArr = (time, startName = 'startTime', endName = 'endTime') => {
  if (time) {
    return {
      [startName]: time[0],
      [endName]: time[1]
    }
  }
  return {
    [startName]: null,
    [endName]: null
  }
}

/**
 * 获取当前时间
 */
export const getNowTime = (formatter = 'YYYY-MM-DD') => {
  return moment().format(formatter)
}
