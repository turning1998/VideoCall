<template>
  <layout-sign>
    <div class="rd-box-center">
      <p class="rd-font-26 rd-font-600 rd-pl-12 logo-text">demo</p>
    </div>
    <div class="rd-px-8;" style="margin-top: 10px">
      <a-form
        ref="formRef"
        autocomplete="off"
        :model="passwordModelRef"
        :rules="rulesRef"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-item name="username">
          <a-input v-model:value="passwordModelRef.username" placeholder="账号" size="large" />
        </a-form-item>
        <a-form-item name="password">
          <a-input
            v-model:value="passwordModelRef.password"
            type="password"
            size="large"
            placeholder="密码"
          />
        </a-form-item>
        <a-button class="sign-btn" block :loading="signInWait" @click="goMain">登录</a-button>
      </a-form>
    </div>
  </layout-sign>
</template>

<script setup>
import { TOKEN_KEY, defaultURL, baseURL } from '@/api/urls';
import { signIn } from '@/api';
import { getUUID } from '@/utils/tools';
import { LOCAL_KEY_USER } from '@/enums/constant';
import DesUtil from '@/utils/DesUtil';

// const { apiFormat } = Common

const labelCol = {
  span: 0,
};
const wrapperCol = {
  span: 24,
};
// 表单校验规则
const rulesRef = {
  username: [{ required: true, message: '帐号不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
};
const activeKey = ref('password');
const formRef = ref();
const passwordModelRef = reactive({
  username: 'zhang',
  password: '1',
  uuid: getUUID(),
});
// 验证码地址
const router = useRouter();
const menusStore = useMenusStore();
const longToken = ref(false);
const signInWait = ref(false);

/**
 * 登录
 */
const goMain = async () => {
  formRef.value
    .validate()
    .then(async () => {
      signInWait.value = true;
      const tempAuth = cloneDeep(toRaw(passwordModelRef));
      // tempAuth.password = DesUtil.encryptDes(tempAuth.password, `${tempAuth.uuid}000`);
      const signInRes = await signIn(tempAuth);
      if (signInRes.success) {
        const { token } = signInRes.data;
        Cookie.set(TOKEN_KEY, token, { expires: longToken.value ? '7d' : '1.5h' });
        if (process.env.VUE_APP_URL === '/mock') {
          const mockToken = 'e66e89f6df7dd53eadb346079fe661fe';
          Cookie.set(TOKEN_KEY, mockToken, { expires: longToken.value ? '7d' : '1.5h' });
        }
        localStorage.setItem(LOCAL_KEY_USER, JSON.stringify(signInRes.data));
        await menusStore.getMenuNav({});
        const mainRoute = toRaw(menusStore.getRoutes);
        router.addRoute(mainRoute);
        if (mainRoute.children.length) {
          const thePath = mainRoute.children[0].path;
          router.push(thePath);
        }
      } else {
        // getCaptcha();
      }
      signInWait.value = false;
    })
    .catch(err => {

    });
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/_mixins.scss';
.logo-text {
}
</style>
