// import XEUtils from 'xe-utils';
// 动态懒加载
export const joinViewsLazy = (filePath) => {
  const modules = import.meta.glob('../views/**/*.vue');
  const module = modules[`../views${filePath}.vue`];
  return module;
}
export const downLoadFile = (res, fileName) => {

  const blob = new Blob([res.data], {
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // application/octet-stream
  });
  if ('download' in document.createElement('a')) {
    const a = document.createElement('a'); 
    a.download = fileName; 
    a.style.display = 'none'; 
    a.href = URL.createObjectURL(blob); 
    document.body.appendChild(a); 
    a.click(); 
    URL.revokeObjectURL(a.href); 
    document.body.removeChild(a); 
  } else {
    navigator.msSaveBlob(blob, fileName);
  }

};
/**
 * yyyy dd-mm--ss转为几分钟前 几天前
 * @param {时间} stringTime="2023-02-27 13:41:57"

 */
export const getTimer = (stringTime) => {
  var minute = 1000 * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var week = day * 7;
  var month = day * 30;
  var time1 = new Date().getTime();//当前的时间戳
  var time2 = Date.parse(new Date(stringTime));//指定时间的时间戳
  var time = time1 - time2;
  var result = null;
  if (time < 0) {
    result =null
  } else if (time / month >= 1) {
    result =  parseInt(time / month) + "月前";
  } else if (time / week >= 1) {
    result =  parseInt(time / week) + "周前";
  } else if (time / day >= 1) {
    result = parseInt(time / day) + "天前";
  } else if (time / hour >= 1) {
    result = parseInt(time / hour) + "小时前";
  } else if (time / minute >= 1) {
    result = parseInt(time / minute) + "分钟前";
  } else {
    result = "刚刚发布";
  }
  return result
}
/**
 * 列表转为树形列表
 * @param {列表} list
 * @param {菜单根id} rootId
 * @returns 树形
 */
export const listToTree = (
  list,
  { pidName = 'pid', idName = 'id' },
  rootId = '0'
) => {
  list.forEach((child) => {
    const pid = child[pidName];
    if (pid !== rootId) {
      list.forEach((parent) => {
        const tempParent = parent;
        if (parent[idName] === pid) {
          tempParent.children = parent.children || [];
          tempParent.children.push(child);
        }
      });
    }
  });
  return list.filter((n) => n[pidName] === rootId);
};
/**
 * 树形列表转为列表
 * @param {树} tree
 * @returns 列表
 */
export const treeToListByBro = (tree) => {
  const list = [];
  const queue = [...tree];
  while (queue.length) {
    const node = queue.shift();
    const { children } = node;
    if (children) {
      queue.push(...children);
    }
    list.push(node);
  }
  return list.map((item) => {
    const tempItem = item;
    tempItem.children = null;
    return tempItem;
  });
};
/**
 * 树形列表转为列表
 * @param {树} tree
 * @returns 列表
 */
export const treeToListByChild = (tree) => {
  const list = [];
  const stack = [...tree];
  while (stack.length) {
    const node = stack.pop();
    const { children } = node;
    if (children) {
      stack.push(...children);
    }
    list.push(node);
  }
  return list.map((item) => {
    const tempItem = item;
    tempItem.children = null;
    return tempItem;
  });
};

/**
 * 获取uuid
 */
export const getUUID = () =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) =>
    (c === 'x' ? Math.random() * 16 || 0 : 'r&0x3' || '0x8').toString(16)
  );

/**
 * 校验手机号
 */
export const regExpMobile = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;

/**
 * 数字大于0
 */
export const regExpNumber = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;

/**
 * 密码校验
 * 密码需要包含数字,字母,字符,长度在8-16位之间
 */
export const regExpPassword =
  /^(?![A-Za-z]+$)(?![A-Z0-9]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![A-Z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,16}$/;

/**
 * 数字添加分隔符、保留小数位
 * @param value
 * @param digits 保留小数位数
 */
// export const areaFormatter = (value, digits = 3) => {
//   if (!value) return '';
//   return XEUtils.commafy(XEUtils.toNumber(value), { digits });
// };

export const getAssetsFile = (url) => {
  return new URL(`../assets/img/${url}`, import.meta.url).href
}
// 转为formdata格式
export const formdataify = function (params) {
  const formData = new FormData();
  Object.keys(params).forEach(key => {
    formData.append(key, params[key]);
  });
  return formData;
};
// 删除对象为空的属性
export  const delEmptyQueryNodes=(params)=>{
  let obj=params
  for(var key in obj ){
    if(obj[key]==''||obj[key]==undefined||obj[key]==null){
      delete  obj[key]
    }
  }
  return obj
}