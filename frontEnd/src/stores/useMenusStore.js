// api
// import { fetchMenuNav } from '@/api';

export default defineStore({
  id: 'menus',
  state: () => ({
    subjectId: '1',
    mainRoute: {
      path: '/',
      name: 'main',
      component: joinViewsLazy('/TheMain'),
      children: [],
    },
    originalList: [],
    menuList: [],
    mainWait: false,
  }),
  getters: {
    getAuthStr: state => {
      const info = state.originalList.filter(value => value.perms && value.type > 1);
      localStorage.setItem('menu', JSON.stringify(state.authStr));
      return info.map(value => value.perms).join(',');
    },
    getMenuTree: state => {
      const subTree = listToTree(state.menuList, {
        idName: 'menuId',
        pidName: 'parentId',
      });
      return subTree;
    },
    getRoutes: state => {
      const subList = state.originalList.filter(menu => menu.url);
      const routeList = subList.map(item => ({
        menuId: item.menuId,
        parentId: item.parentId,
        path: item.url,
        name: snakeCase(item.url),
        component: joinViewsLazy(item.pageUrl || '/TheError404'),
        meta: {
          type: item.type,
          title: item.name || '',
          key: item.key || '',
          icon: item.icon || '',
          orderNum: item.orderNum || 0,
        },
      }));
      return {
        ...state.mainRoute,
        children: routeList,
      };
    },
  },
  actions: {
    async getMenuNav(params) {
      // const res = await fetchMenuNav(params);
      // if (res.success) {
        const tempData = [
          {
            "menuId": "1",
            "parentId": "0",
            "parentName": null,
            "name": "工作台",
            "url": "home",
            "perms": "",
            "type": 1,
            "icon": "PieChartOutlined",
            "orderNum": 1,
            "open": null,
            "list": null,
            "key": "home",
            "pageUrl": "/HomeIndex",
            "subjectId": "2"
          },
          {
            "menuId": "1",
            "parentId": "0",
            "parentName": null,
            "name": "工作台",
            "url": "map",
            "perms": "",
            "type": 1,
            "icon": "PieChartOutlined",
            "orderNum": 1,
            "open": null,
            "list": null,
            "key": "map",
            "pageUrl": "/Map/MapEdit",
            "subjectId": "2"
          },
 




        ];
        tempData.sort((o1, o2) => {
          if (o1.parentId === o2.parentId) {
            return o1.orderNum - o2.orderNum;
          }
          return o1.parentId - o2.parentId;
        });
        this.originalList = tempData;
        this.menuList = tempData.filter(menu => menu.type < 2);
      // } else {
      //   this.originalList = [];
      //   this.menuList = [];
      // }
    },
    setSubjectId(info) {
      this.subjectId = info;
    },
  },
});
