<template>
  <layout-sign>
    <a-tabs
      v-model:activeKey="activeKey"
      class="sign-tabs sign-up"
      :tab-bar-gutter="10"
    >
      <a-tab-pane
        key="company"
        tab="企业注册"
      >
        <div class="rd-px-8">
          <a-form
            ref="companyFormRef"
            autocomplete="off"
            :model="companyModelRef"
            :rules="rulesRef"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-item name="name">
              <a-input
                v-model:value="companyModelRef.name"
                placeholder="账号"
                size="large"
              />
            </a-form-item>
            <a-form-item name="password">
              <a-input
                v-model:value="companyModelRef.password"
                type="password"
                size="large"
                placeholder="密码"
              />
            </a-form-item>
            <a-form-item name="quality">
              <a-select
                v-model:value="companyModelRef.quality"
                size="large"
                class="rd-w-100"
              >
                <a-select-opt-group>
                  <template #label>
                    <span> Manager </span>
                  </template>
                  <a-select-option value="jack">
                    Jack
                  </a-select-option>
                  <a-select-option value="lucy">
                    Lucy
                  </a-select-option>
                </a-select-opt-group>
                <a-select-opt-group label="Engineer">
                  <a-select-option value="Yiminghe">
                    yiminghe
                  </a-select-option>
                  <a-select-option value="Yiminghe1">
                    yiminghe1
                  </a-select-option>
                </a-select-opt-group>
              </a-select>
            </a-form-item>
            <div class="rd-font-center">
              <a-button type="link">
                下一步
              </a-button>
            </div>
          </a-form>
        </div>
      </a-tab-pane>
      <a-tab-pane
        key="person"
        tab="个人注册"
      >
        短信登录
      </a-tab-pane>
      <template #rightExtra>
        <a-button
          type="link"
          @click="router.push('/signIn')"
        >
          已有账号，马上登录
        </a-button>
      </template>
    </a-tabs>
  </layout-sign>
</template>

<script setup>
const labelCol = {
  span: 0,
};
const wrapperCol = {
  span: 24,
};
// 表单校验规则
const rulesRef = {
  name: [{ required: true, message: '帐号不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
  captcha: [{ required: true, message: '验证码不能为空', trigger: 'blur' }],
};

const router = useRouter();
const activeKey = ref('company');
const companyFormRef = ref();
const companyModelRef = reactive({
  username: '',
  password: '',
  quality: '',
});
</script>

<style lang="scss" scoped>
</style>
