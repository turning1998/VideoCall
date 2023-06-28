<template>
  <div>111</div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { message } from 'ant-design-vue';
// 精密监测
export default defineComponent({
  name: 'videoCall',

  setup(props, { emit }) {
    onMounted(async () => {});

    return {};
  },
});
</script>

<style lang="scss" scoped>
.sigle-station {
  margin: 20px auto;
  text-align: center;

  div {
    font-size: 18px;
    font-weight: bold;
    width: 1000px;
    margin: 0 auto;

    div {
      float: left;
      width: 400px;
      height: 50px;
      border: 1px solid;
      vertical-align: middle;
      line-height: 50px;
    }
  }
}
</style>
