import { notification } from 'ant-design-vue';
import { encode } from 'js-base64';

import { TOKEN_KEY } from './urls';
/**
 * 处理blob请求服务
 */
export const errorFormatBlob = (res) => {
  const { code, msg, errorMessage } = res;
  if (code === 2001) {
    notification.error({
      message: '温馨提示',
      description: msg || errorMessage,
    });
  }
  if ([401, 403, 1000].includes(code)) {
    Cookie.delete(TOKEN_KEY);
    notification.error({
      message: '温馨提示',
      description: '获取权限失败,请刷新页面',
    });
  }
  if ([500, 501].includes(code)) {
    // console.error(res);
  }
  return {
    success: false,
    data: null,
  };
};
export const apiFormatBlob = (res) => {
  const { data: resData, headers } = res;
  if (resData) {
    return {
      success: true,
      data: URL.createObjectURL(resData),
      headers,
    };
  }
  return errorFormatBlob(res);
};
