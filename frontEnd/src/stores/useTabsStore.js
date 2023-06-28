import { defineStore } from 'pinia';

export default defineStore({
  id: 'counter',
  state: () => ({
    mainPanes: [],
    mainPanesKey: '',
  }),
  getters: {},
  actions: {
    // 设置新窗格
    setMainPanes(info) {
      const keys = this.mainPanes.map((pane) => pane.key);
      this.mainPanesKey = info.key;
      if (keys.includes(info.key)) {
        return;
      }
      this.mainPanes = [...this.mainPanes, info];
    },
    // 删一个窗格
    removeMainPane(rmKey) {
      this.mainPanes = this.mainPanes.filter((pane) => pane.key !== rmKey);
      this.mainPanesKey = this.mainPanes[this.mainPanes.length - 1].key;
    },
    // 更换当前窗格key
    setMainPanesKey(info) {
      this.mainPanesKey = info;
    },
    // 删其他窗格
    clearOtherPanes() {
      if (this.mainPanes.length > 1) {
        this.mainPanes = this.mainPanes.filter(
          (pane) => pane.key === this.mainPanesKey
        );
      }
    },
    // 清除所有窗格
    clearMainPanes() {
      this.$reset();
    },
  },
});
