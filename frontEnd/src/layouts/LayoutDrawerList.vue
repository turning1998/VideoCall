<template>
  <slot name="main" />
  <a-drawer
    placement="right"
    :width="drawerWidth"
    :title="title"
    :visible="visible"
    :mask-closable="false"
    :get-container="false"
    :style="warpStyle"
    @close="$emit('update:visible', false)"
  >
    <slot name="drawer" />
  </a-drawer>
</template>

<script>
export default defineComponent({
  name: 'LayoutDrawerList',
  props: {
    title: {
      type: String,
      default: '',
    },
    visible: {
      type: Boolean,
      default: false,
    },
    drawerWidth: {
      type: String,
      default: '46%',
    },
    warpStyle: {
      type: Object,
      default: () => ({ position: '' })
      ,
    },
  },
  emits: ['update:visible'],
});
</script>

<style lang="scss" scoped>
</style>
