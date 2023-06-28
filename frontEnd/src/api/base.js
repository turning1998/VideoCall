import { notification } from 'ant-design-vue';

import { router } from '@/router';
import Request from '@/api/request';
import * as Urls from './urls';

/**
 * 清空痕迹 - 退出登录
 */
export const signOut = () => {
  const store = useStore();
  localStorage.clear();
  sessionStorage.clear();
  Cookie.delete(Urls.TOKEN_KEY);
  router.replace('/signIn');
  store.resetStates();
};
/**
 * 处理请求服务
 */
const errorFormat = (res, controller) => {
  const { code, success, msg, errorMessage } = res;
  if (code === 2001) {
    notification.error({
      message: '温馨提示',
      description: msg || errorMessage,
    });
  }
  if ([401, 403, 1000].includes(code)) {
    controller.abort();
    Cookie.delete(Urls.TOKEN_KEY);
    notification.error({
      message: '温馨提示',
      description: '获取权限失败,请重新登录',
    });
    // signOut();
  }
  if ([500, 501].includes(code) || !success) {
    // console.error(res);
  }
  return {
    success: false,
    data: null,
    errorMessage
  };
};
const apiFormat = (resData, controller) => {
  const { code, data,errorMessage } = resData;
  if (code === 200) {
    return {
      success: true,
      data,
      errorMessage,
    };
  }
  if (!code) return resData;
  return errorFormat(resData, controller);
};

/**
 * 系统公用
 */
// 登录
export async function signIn(data) {
  // const res = await Request({
  //   baseURL: Urls.defaultURL,
  //   method: 'post',
  //   url: Urls.signInUrl,
  //   data,
  // });
  return apiFormat({
    "code": 200,
    "message": "success",
    "data": {
        "subjectId": "1",
        "token": "fa4db7618a55c487365a46345bd7035f",
        "nickName": "11",
        "orgName": "测试"
    }
});
}
// 公用系统请求
export async function fetchSystem(option) {
  const controller = new AbortController();
  const token = Cookie.get(Urls.TOKEN_KEY);
  const res = await Request({
    baseURL: Urls.defaultURL,
    signal: controller.signal,
    ...option,
  });
  if (!token) {
    controller.abort();
    signOut();
  }
  return apiFormat(res.data, controller);
}







export async function fetchBlobSystem(option) {
  const res = await Request({
    baseURL: Urls.defaultURL,
    ...option,
  });
  if (res.config && res.config.responseType === 'blob') {
    return res;
  }
  return apiFormatGIS(res);
}

export function fetchStationInfo() {
  return fetchSystem({
    url: Urls.get_station_info,
    method: 'post',
  });
}
// 获取电池电压信息
export function fetchBatteryVoltage() {
  return fetchSystem({
    url: Urls.get_battery_voltage_info,
    method: 'post'
  });
}
// 获取质量考核
export function fetchquality() {
  return fetchSystem({
    url: Urls.get_monitor_station_info,
    method: 'post'
  });
}
export function fetchBaowen() {
  return fetchSystem({
    url: Urls.get_20_min_not_baowen,
    method: 'post'
  });
}
export function fetgdmbsrs() {
  return fetchBlobSystem({
    url: Urls.get_gdmbsrs_data,
    method: 'post',
    responseType: 'blob',
  });
}
export function fetchmodes() {
  return fetchSystem({
    url: Urls.get_mods_info,
    method: 'post'
  });
}
export function fetchStation(data) {
  return fetchSystem({
    url: `${Urls.query_station_info}?station=${data.station}`,
    method: 'post',
    data
  });
}
export function fetchChatroomList(data) {
  return fetchSystem({
    url: `${Urls.get_chatroom_list}`,
    method: 'post',
    data
  });
}
export function fetchwxMsgTypeList(data) {
  return fetchSystem({
    url: `${Urls.get_wechat_msg_type}`,
    method: 'post',
    data
  });
}
export function fetchWechatList(data) {
  return fetchSystem({
    url: `${Urls.get_wechat_config}?wechat_id=${data.wechat_id}`,
    method: 'post',
    data
  });
}
export function fetchWechatAdd(data) {
  return fetchSystem({
    url: `${Urls.add_wechat_config}?wechat_id=${data.wechat_id}&is_use=${data.is_use}`,
    method: 'post',
    data
  });
}
export function fetchWechatUpdate(data) {
  return fetchSystem({
    url: `${Urls.update_wechat_config}?wechat_id=${data.wechat_id}&is_use=${data.is_use}`,
    method: 'post',
    data
  });
}
export function fetchWechatDel(data) {
  return fetchSystem({
    url: `${Urls.del_wechat_config}?config_id=${data}`,
    method: 'post',
  });
}
// 外呼
export function fetchPhoneList() {
  return fetchSystem({
    url: `${Urls.get_phone_config}`,
    method: 'post'
  });
}
export function fetchPhoneAdd(data) {
  return fetchSystem({
    url: `${Urls.add_phone_config}`,
    method: 'post',
    data
  });
}
export function fetchPhoneUpdate(data) {
  return fetchSystem({
    url: `${Urls.update_phone_config}?phoneConfigId=${data.phoneConfigId}`,
    method: 'post',
    data
  });
}
export function fetchPhoneDel(phoneConfigId) {
  return fetchSystem({
    url: `${Urls.del_phone_config}?phoneConfigId=${phoneConfigId}`,
    method: 'post',
  });
}

export function fetchPersonalInfo(data) {
  return fetchSystem({
    url: `${Urls.get_personal_info}`,
    method: 'post',
    data
  });
}
export function fetchContacts(data) {
  return fetchSystem({
    url: `${Urls.get_contacts}`,
    method: 'post',
    data
  });
}