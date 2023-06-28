<template>
  <LayoutMain v-model:collapsed="collapsed">
    <template #header>
      <div class="rd-box-between">
        <div v-if="menusStore.subjectId && menusStore.subjectId === '1'" class="rd-box">
          <span class="title-system">demo</span>
        </div>
        <div
          v-if="menusStore.subjectId && menusStore.subjectId !== '1'"
          class="rd-box back-btn"
          @click="backHome"
        >
          <IconFont class="rd-font-24" type="icon-gqjc-arrow" />
          <span class="rd-font-16 rd-color-primary rd-pl-16">返回主页</span>
        </div>

        <a-dropdown overlay-class-name="userinfo-dropdown" placement="bottomRight">
          <div
            class="rd-pointer"
            style="
              width: 32px;
              height: 32px;
              line-height: 32px;
              text-align: center;
              background: #5262f4;
              border-radius: 50%;
            "
          >
            <span
              style="
                width: 10px;
                height: 13px;
                font-size: 16px;

                font-weight: 800;

                color: #ffffff;
              "
            >
              A
            </span>
          </div>
        </a-dropdown>
      </div>
    </template>
    <template #content>
      <router-view v-if="theFlag" v-slot="{ Component }">
        <keep-alive>
          <transition :name="route.meta.transition || 'fade'" mode="out-in">
            <div class="main-container">
              <component :is="Component" />
            </div>
          </transition>
        </keep-alive>
      </router-view>
    </template>
  </LayoutMain>
</template>

<script setup>
// import LayoutMain from '@/layout/LayoutMain.vue';
import { LOCAL_KEY_USER } from '@/enums/constant';
import { signOut } from '@/api';

const router = useRouter();
const route = useRoute();
const menusStore = useMenusStore();
const tabsStore = useTabsStore();
const updateInfoRef = ref(null);
const userinfo = JSON.parse(localStorage.getItem(LOCAL_KEY_USER));
// 时间戳
const theFlag = ref(true);
// 菜单选中项列表
const defaultSelectedKeys = computed(() => {
  const { meta } = route;
  return meta.key ? [meta.key] : [];
});
// 菜单开启项列表
const defaultOpenKeys = computed(() => {
  const { meta } = route;
  const keys = meta.key.split('.');
  const list = [];
  keys.reduce((a, b) => {
    list.push(a);
    return `${a}.${b}`;
  });
  return list;
});
// const mainWait = computed(() => store.state.Menus.mainWait);
// 菜单列表
// const menuList = computed(() => store.state.Menus.menuList);
// 菜单树
// const menuTree = computed(() => store.state.Menus.menuTree);
// 专题id
// const subjectId = computed(() => store.state.Menus.subjectId);
// 选项卡列表
// const panes = computed(() => store.state.Tabs.mainPanes);
const panesActiveKey = computed({
  get: () => tabsStore.mainPanesKey,
  set: val => {
    tabsStore.setMainPanesKey(val);
    const query = tabsStore.mainPanes.find(i => i.key === val)?.query;
    router.push({
      path: val,
      query,
    });
  },
});
const removeTab = key => {
  tabsStore.removeMainPane(key);
  const query = tabsStore.mainPanes.find(i => i.key === tabsStore.mainPanesKey)?.query;
  router.push({
    path: tabsStore.mainPanesKey,
    query,
  });
};

const collapsed = ref(false);
const toggleCollapsed = () => {
  collapsed.value = !collapsed.value;
};

const backHome = async () => {
  localStorage.removeItem('projectId');
  menuStore.setSubjectId('1');
  tabsStore.clearMainPanes();
  menusStore.$patch({ mainWait: true });
  await menuStore.getMenuNav({});
  setTimeout(() => {
    menusStore.$patch({ mainWait: false });
  }, 2000);
  const { mainRoute } = menusStore;
  const thePath = mainRoute.children[0].path;
  router.addRoute(mainRoute);
  router.push(thePath);
};

const goPage = path => {
  tabsStore.setMainPanesKey(path);
  router.push({ path });
};

const refresh = () => {
  theFlag.value = false;
  nextTick(() => {
    theFlag.value = true;
  });
};

const updateUserInfo = () => {
  updateInfoRef.value.init();
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/_vars.scss';
@import '../assets/scss/_mixins.scss';

.main-container {
  height: 100%;
  overflow: hidden;
  @include position(relative);
}

.back-btn {
  cursor: pointer;
}

.menu-toggle {
  @extend .back-btn;
  height: 28px;
  background-color: $--bg-primary;
}

.fade-enter-active {
  transition: all 0.3s ease-out;
}

.fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.title-system {
  font-size: 16px;

  font-weight: 400;
  color: #121212;
  margin-left: -10px;
}
</style>
