<template>
  <a-layout class="container">
    <a-layout-header class="header" v-if="route.path=='/home'">
      <slot name="header" />
    </a-layout-header>
    <a-layout>
      <a-layout>
        <a-layout-header class="rd-px-12  panes">
          <slot name="panes" />
        </a-layout-header>
        <a-layout-content class=" rd-area-none">
          <slot name="content" />
        </a-layout-content>
      </a-layout>
    </a-layout>
    <a-layout-footer v-if="footerShow">
      <slot name="footer" />
    </a-layout-footer>
  </a-layout>
</template>

<script>
import {useRoute} from 'vue-router'
export default defineComponent({
  name: 'LayoutMain',
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:collapsed'],
  setup(_, context) {
    const route=useRoute();
    const { footer } = context.slots;
    const footerShow = ref(false);
    if (footer) {
      footerShow.value = true;
    }
    return {
      footerShow,
      route
    };
  },
});
</script>

<style lang="scss" scoped>
@import "../assets/scss/_vars.scss";

.container {
  height: 100%;
  .header {
    border: 1px solid #EEEEEE;
    z-index: 9;
  }
  .panes {
    height: inherit;
    background-color: transparent;
  }
}
</style>
