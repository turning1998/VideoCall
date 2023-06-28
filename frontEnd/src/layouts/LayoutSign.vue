<template>
  <div
    class="rd-box-full-col rd-area-y container"
  >
    <div class="rd-flex-1 rd-box-center">
      <div class="rd-py-48 rd-px-32 main-box">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default defineComponent({
  name: 'LayoutSign',
});
</script>

<style lang="scss" scoped>
@import '../assets/scss/_vars.scss';

.container {
  width: 100vw;
  height: 100vh;
  background: center/cover no-repeat;
  position: relative;
}
.main-box {
  background: rgba($color: white, $alpha: 0.5);
  border-radius: 0px 40px 0px 40px;
  box-shadow: 0px 12px 39px 1px rgba(35, 35, 35, 0.08);
}
.download-icon {
  cursor: pointer;
  width: 68px;
  height: 100px;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  background: white;
  position: absolute;
  right: 0;
  top: calc(50% - 50px);
}
</style>
