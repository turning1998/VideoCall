import { fetchMenuList } from '@/api';

const tableTree = ref([]);
const menuTree = ref([]);
const allCheckKeys = [];

const getAllCheckKeys = (list) => {
  list.forEach((item) => {
    if (item.children) {
      getAllCheckKeys(item.children);
    } else {
      allCheckKeys.push(item.menuId);
    }
  });
};

/**
 * 获取菜单列表
 */
const getMenuList = async (subjectId, checkKeys) => {
  const listRes = await fetchMenuList({ subjectId });
  const { success, data } = listRes;
  if (success) {
    data.sort((o1, o2) => {
      if (o1.parentId === o2.parentId) {
        return o1.orderNum - o2.orderNum;
      }
      return o1.parentId - o2.parentId;
    });
    tableTree.value = listToTree(cloneDeep(data), { idName: 'menuId', pidName: 'parentId' });
    const subList = [{ menuId: '0', parentId: '-1', name: '根目录' }, ...data.filter((item) => item.type < 2)];
    const tempSubList = subList.map((item) => {
      const tempItem = item;
      const menuKey = tempItem.key;
      delete tempItem.key;
      tempItem.menuKey = menuKey;
      return tempItem;
    });
    menuTree.value = listToTree(tempSubList, { idName: 'menuId', pidName: 'parentId' }, '-1');
    if (checkKeys && checkKeys.length) {
      const checkList = data.filter((item) => checkKeys.includes(item.menuId));
      const checkTree = listToTree(cloneDeep(checkList), { idName: 'menuId', pidName: 'parentId' });
      getAllCheckKeys(checkTree);
    }
    return;
  }
};

export default {
  tableTree,
  menuTree,
  allCheckKeys,
  getMenuList,
};
