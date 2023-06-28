import { createVNode } from 'vue';
import * as antIcons from '@ant-design/icons-vue';
import { createFromIconfontCN } from '@ant-design/icons-vue';

const props = {
  rotate: {
    type: Number,
  },
  spin: {
    type: Boolean,
    default: false,
  },
  style: {
    type: Object,
    default: () => {},
  },
  twoToneColor: {
    type: String,
    default: '',
  },
};

const IconFont = createFromIconfontCN({
  scriptUrl: [''],
  extraCommonProps: props,
});

const IconAnt = (selfProps) => {
  const { type } = selfProps;
  if (antIcons[type]) {
    return createVNode(antIcons[type], selfProps);
  }
  return '';
};

export default function dist(app) {
  app.component('IconAnt', IconAnt);
  app.component('IconFont', IconFont);
}
