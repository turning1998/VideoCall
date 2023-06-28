import XEUtils from 'xe-utils';
import zhCN from 'vxe-table/lib/locale/lang/zh-CN';
import {
  // 核心
  VXETable,
  // 表格功能
  Header,
  Icon,
  // 可选组件
  Column,
  Toolbar,
  Pager,
  Grid,
  Tooltip,
  Button,
  // 表格
  Table,
} from 'vxe-table';
// import VXETablePluginAntd from 'vxe-table-plugin-antd'
// import 'vxe-table-plugin-antd/dist/style.css'

// 按需加载的方式默认是不带国际化的，自定义国际化需要自行解析占位符 '{0}'，例如：
VXETable.setup({
  i18n: (key, args) => XEUtils.toFormatString(XEUtils.get(zhCN, key), args),
});
// VXETable.use(VXETablePluginAntd)
export default function dist(app) {
  app
    .use(Header)
    .use(Icon)
    .use(Column)
    .use(Toolbar)
    .use(Pager)
    .use(Grid)
    .use(Tooltip)
    .use(Button)
    .use(Table);
}
