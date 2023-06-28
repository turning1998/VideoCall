import { defineStore } from 'pinia';
// import useCounterStore from './counter';

const modulesFiles = import.meta.globEager('./**/*.js');
const modules = Object.values(modulesFiles).map((v) => v.default);

export default defineStore({
  id: 'index',
  actions: {
    resetStates() {
      modules.forEach((module) => module().$reset());
    },
  },
});
