<template>
  <layout-drawer-list>
    <template #main>
      <div class="card-container">
        <a-tabs v-model:activeKey="activeKey" type="card">
          <a-tab-pane key="1" tab="音视频">
            <Statistics></Statistics>
          </a-tab-pane>
          <a-tab-pane key="2" tab="站点分布地图">
            <StationMapInfo></StationMapInfo>
          </a-tab-pane>
        </a-tabs>
      </div>
    </template>
  </layout-drawer-list>
</template>

<script setup>
import { getTimer, getAssetsFile } from '@/utils/tools';
import { message } from 'ant-design-vue';
import LayoutDrawerList from '@/layouts/LayoutDrawerList.vue';
import { useRouter } from 'vue-router';
import StationMapInfo from './StationMapInfo.vue';
import Statistics from './videoCall.vue';

const router = useRouter();

const activeKey = ref('1');
onMounted(async () => {});
</script>

<style lang="scss" scoped>
.card-container p {
  margin: 0;
}

.card-container > .ant-tabs-card .ant-tabs-content {
  height: 120px;
  margin-top: -16px;
}

.card-container > .ant-tabs-card .ant-tabs-content > .ant-tabs-tabpane {
  padding: 16px;
  background: #fff;
}

.card-container > .ant-tabs-card > .ant-tabs-nav::before {
  display: none;
}

.card-container > .ant-tabs-card .ant-tabs-tab,
[data-theme='compact'] .card-container > .ant-tabs-card .ant-tabs-tab {
  background: transparent;
  border-color: transparent;
}

.card-container > .ant-tabs-card .ant-tabs-tab-active,
[data-theme='compact'] .card-container > .ant-tabs-card .ant-tabs-tab-active {
  background: #fff;
  border-color: #fff;
}

#components-tabs-demo-card-top .code-box-demo {
  padding: 24px;
  overflow: hidden;
  background: #f5f5f5;
}

[data-theme='compact'] .card-container > .ant-tabs-card .ant-tabs-content {
  height: 120px;
  margin-top: -8px;
}

[data-theme='dark'] .card-container > .ant-tabs-card .ant-tabs-tab {
  background: transparent;
  border-color: transparent;
}

[data-theme='dark'] #components-tabs-demo-card-top .code-box-demo {
  background: #000;
}

[data-theme='dark'] .card-container > .ant-tabs-card .ant-tabs-content > .ant-tabs-tabpane {
  background: #141414;
}

[data-theme='dark'] .card-container > .ant-tabs-card .ant-tabs-tab-active {
  background: #141414;
  border-color: #141414;
}
</style>
