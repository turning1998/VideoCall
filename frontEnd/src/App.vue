<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view />
    </div>
  </a-config-provider>
</template>


<script>
import zhCN from 'ant-design-vue/es/locale/zh_CN';

export default {
  setup() {
    return {
      locale: zhCN,
    };
  },
};
</script>

<style lang="scss">
body {
  color: $--color-dark;
}
p,
h1,
h2,
h3,
h4,
h5 {
  padding: 0;
  margin: 0;

}
#app {

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  min-width: 992px;
}
</style>
