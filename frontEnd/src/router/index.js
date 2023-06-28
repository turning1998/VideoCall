import { notification } from 'ant-design-vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { TOKEN_KEY } from '@/api/urls';
import { LOCAL_KEY_USER } from '@/enums/constant';

const globalRoutes = [
  {
    path: '/signIn',
    name: 'signIn',
    component: joinViewsLazy('/SignIn'),
  },
  {
    path: '/signUp',
    name: 'signUp',
    component: joinViewsLazy('/SignUp'),
  },
];

/*
  child: {
    path: /home/count,
    name: home_count,
    component: 页面,
    meta: {
      title: 名称
    }
  }
*/

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [...globalRoutes],
});
// 是否为刷新进入页面
let registerRouteFresh = true;

router.beforeEach(async (to, from, next) => {
  const store = useStore();
  const menusStore = useMenusStore();
  const tabsStore = useTabsStore();
  const globalPaths = globalRoutes.map(route => route.path);
  if (globalPaths.includes(to.path)) {
    next();
    return;
  }

  const userInfo = localStorage.getItem(LOCAL_KEY_USER);
  if (!userInfo) {
    notification.error({
      message: '温馨提示',
      description: '未找到用户信息,请重新登录',
    });
    localStorage.clear();
    Cookie.delete(TOKEN_KEY);
    store.resetStates();
    next('/signIn');
    return;
  }

  const projectId = localStorage.getItem('projectId') || '';
  const params = {};
  if (projectId) {
    params.projectId = projectId;
  }
  if (registerRouteFresh) {
    if (from.path.indexOf('signIn') < 0) {
      await menusStore.getMenuNav(params);
      router.addRoute(menusStore.getRoutes);
    }
    router.addRoute({
      path: '/:pathMatch(.*)*',
      name: '404',
      component: joinViewsLazy('/TheError404'),
    });
    next({ ...to, replace: true });
    registerRouteFresh = false;
  } else {
    if (to.path === '/') {
      next({ path: to.matched[0].children[0].path, replace: true });
      return;
    }
    const { path, meta, query } = to;

    tabsStore.setMainPanes({ key: path, title: meta.title, query });
    next();
  }
});

export default function dist(app) {
  app.use(router);
}
