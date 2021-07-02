import axios from 'axios';
import QS from 'qs';


const token = localStorage.getItem('token');
// axios 配置
var instance = axios.create({

  timeout: 30000,
  baseURL: '',   //接口请求地址
})
// 添加请求拦截器
instance.interceptors.request.use(config => {
  // 在发送请求之前做些什么，比如传token
  //这里放了QS.stringify进行数据转换处理
  if (config.data.code) {
    config.data = config.data.serialize;
  } else {
    config.data = QS.stringify(config.data);
  }

  return config
}, error => {
  // 对请求错误做些什么
  // console.log(error) // for debug
  return Promise.reject(error);
})

// 添加响应拦截器
instance.interceptors.response.use(response => {
  // 对响应数据做点什么
  const res = response.data;
  //对错误代码做处理
  return response;
}, error => {
  // 对响应错误做点什么
  // console.log('err' + error)// for debug
  return Promise.reject(error);
});

export default instance;

/**
 * post 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    instance.post(url, data).then(response => {
      //对接口错误码做处理
      resolve(response.data);
    }, err => {
      reject(err);
    })
  })
}


/**
 * get 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get(url, data = {}) {
  return new Promise((resolve, reject) => {
    instance.get(url, {
      params: data
    })
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 封装所有请求
 * 默认为get方法
 * @param methed
 * @param url
 * @param data
 * @param headers
 * @returns {Promise}
 */
export function request(methed, url, data = {}, headers) {
  // if(localStorage.token){
  //   var dic={'front-token': localStorage.token};
  // }
  return new Promise((resolve, reject) => {
    instance({
      method: methed || 'get',
      url: url,
      params: methed === 'get' ? data : '',
      data: methed !== 'get' ? data : '',
      //备注备注
      headers: {'front-token': localStorage.token||''},  //将token设置成请求头
      //备注备注
      // headers: { 'front-token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJFMTU0QzU0MzhENDdENkYwMDNCMDk2MkEwOTlGNDhDMiIsInVzZXJOYW1lIjoiMTU4MzkyNjM1NDAiLCJ1c2VyQWdlbnQiOiJNb3ppbGxhLzUuMCAmICM0MElOVkFMSURNYWNpbnRvc2hJTlZBTElEIEludGVsIE1hYyBPUyBYIDEwLjE1SU5WQUxJRCBydjo4Ny4wJiAjNDFJTlZBTElEIEdlY2tvLzIwMTAwMTAxIEZpcmVmb3gvODcuMCJ9.bve3GUHUyN_kkPA2vUqpnV-aJPVajUM1v7cJn0tw8dU' },
    })
      .then(response => {
        //对接口错误码做处理
        // console.log(response)
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
  })
}
export function request2(methed, url, data = {}, serialize = true) {
  return new Promise((resolve, reject) => {
    // 不需要序列化
    if (!serialize) {
      data = {
        code: true,
        serialize: data
      }
    }
    // console.log(data,'xulieh')
    instance({
      method: methed || 'get',
      url: url,
      params: methed === 'get' ? data : '',
      data: methed !== 'get' ? data : '',
      headers: { 'front-token': localStorage.token  },
      // headers: { 'front-token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiJFMTU0QzU0MzhENDdENkYwMDNCMDk2MkEwOTlGNDhDMiIsInVzZXJOYW1lIjoiMTU4MzkyNjM1NDAiLCJ1c2VyQWdlbnQiOiJNb3ppbGxhLzUuMCAmICM0MElOVkFMSURNYWNpbnRvc2hJTlZBTElEIEludGVsIE1hYyBPUyBYIDEwLjE1SU5WQUxJRCBydjo4Ny4wJiAjNDFJTlZBTElEIEdlY2tvLzIwMTAwMTAxIEZpcmVmb3gvODcuMCJ9.bve3GUHUyN_kkPA2vUqpnV-aJPVajUM1v7cJn0tw8dU' },
    })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
  })
}
