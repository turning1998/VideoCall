import axios from 'axios';

import * as Urls from '@/api/urls';

// 请求超时时间
axios.defaults.timeout = 30 * 1000;
// post请求头
axios.defaults.headers['Content-Type'] = 'application/json';
// axios.defaults.headers['Access-Control-Allow-Origin'] = '*';

// 请求拦截器
// axios.interceptors.request.use(
//   config => {
//     const tempConfig = config;
//     if (Urls.reqWhites.includes(tempConfig.url)) {
//       return tempConfig;
//     }
//     // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
//     // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
//     let token = Cookie.get(Urls.TOKEN_KEY);
//     if (tempConfig.baseURL === Urls.mapURL) {
//       token = Cookie.get(Urls.TOKEN_KEY_GIS);
//     }
//     tempConfig.headers.token = token;
//     return tempConfig;
//   },
//   error => Promise.reject(error),
// );

// 响应拦截器
axios.interceptors.response.use(
  response => Promise.resolve(response),
  // 服务器状态码不是200的情况
  error => {
    // console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
);

export default axios;
