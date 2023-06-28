export const TOKEN_KEY = 'system_token';
export const TOKEN_KEY_GIS = 'yfgis_token';

export const defaultURL = import.meta.env.VITE_URL;
export const mapURL = import.meta.env.VITE_MAP_URL;
export const biangnegURL = import.meta.env.VITE_BIAN_BENG;
export const baseURL = 'https://zyhcool.top:8080';
export const baseURL1 = 'paas-web';

// 公共
export const signInUrl = '/sys/login';
export const signInGisUrl = '/admin/login'; // 登录gis,即将废弃





// 站点信息
// 获取站点信息
export const get_station_info = `${baseURL}/get_station_info`;
// 质量考核
export const get_monitor_station_info = `${baseURL}/get_monitor_station_info`;
//报文监测
export const get_20_min_not_baowen = `${baseURL}/get_20_min_not_baowen`;
// 传输及时率
export const get_gdmbsrs_data = `${baseURL}/get_gdmbsrs_data`;
// 获取mods消息
export const get_mods_info = `${baseURL}/get_mods_info`;
// 查询单站点信息
export const query_station_info = `${baseURL}/query_station_info`;
// 获取电池电压信息
export const get_battery_voltage_info = `${baseURL}/get_battery_voltage_info`;


// 微信信息

// 获取当前微信信息
export const get_personal_info = `${baseURL}/get_personal_info`;
// 获取微信群组
export const get_chatroom_list = `${baseURL}/get_chatroom_list`;
// 获取微信发送消息类型
export const get_wechat_msg_type = `${baseURL}/get_wechat_msg_type`;
// 查询当前微信发送消息配置
export const get_wechat_config = `${baseURL}/get_wechat_config`;
// 添加微信发送消息配置
export const add_wechat_config = `${baseURL}/add_wechat_config`;
// 更新微信发送消息配置
export const update_wechat_config = `${baseURL}/update_wechat_config`;
// 删除微信发送消息配置
export const del_wechat_config = `${baseURL}/del_wechat_config`;


// 外呼
// 获取外呼配置
export const get_contacts = `${baseURL}/get_contacts`;

export const get_phone_config = `${baseURL}/get_phone_config`;
// 添加外呼配置
export const add_phone_config = `${baseURL}/add_phone_config`;
// 更新外呼配置
export const update_phone_config = `${baseURL}/update_phone_config`;
// 删除外呼配置
export const del_phone_config = `${baseURL}/del_phone_config`;










// 白名单URL
export const reqWhites = [signInGisUrl];
