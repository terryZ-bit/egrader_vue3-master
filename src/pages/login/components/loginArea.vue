<template>
  <div id="login-area">
    <div class="login-form" style="margin-top: 60px">
      <p
        style="display: block; width: 100%; text-align: left; font-size: x-large; font-weight: bold; margin-left: 10px"
      >
        欢迎回来！
      </p>
      <p
        style="
          display: block;
          width: 100%;
          text-align: left;
          font-size: larger;
          font-weight: bold;
          margin-left: 10px;
          margin-bottom: 30px;
        "
      >
        请先
        <span style="color: #0052d9"> 登录 </span>
      </p>
      <t-form ref="form" :data="formData" :colon="true" :label-width="0" :rules="FORM_RULES" @submit="onSubmit">
        <t-form-item name="account" style="margin: 10px 10px 20px">
          <t-input v-model="formData.account" clearable placeholder="请输入账户名">
            <template #prefix-icon>
              <t-icon name="user" />
            </template>
          </t-input>
        </t-form-item>
        <t-form-item name="password" style="margin: 10px 10px 20px">
          <t-input v-model="formData.password" type="password" clearable placeholder="请输入密码">
            <template #prefix-icon>
              <t-icon name="lock-on" />
            </template>
          </t-input>
        </t-form-item>
        <t-form-item style="padding-top: 8px; margin: 10px">
          <t-button theme="primary" type="submit" block :loading="loginBtnLoading">登录</t-button>
        </t-form-item>
      </t-form>
      <div class="sign-in-check-area">
        <t-button theme="primary" variant="text" @click="pushToEnroll('enroll')">注册</t-button>
        <t-button theme="primary" variant="text" @click="pushToEnroll('forgetPassword')">忘记密码？</t-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'LoginArea',
}
</script>

<script lang="ts" setup>
import { ref } from 'vue'
import { login } from '@/apis/login'
import { MessagePlugin } from 'tdesign-vue-next'
import { useRouter } from 'vue-router'
import md5 from 'js-md5'
import { getUserStore } from '@/store'
const INITIAL_DATA = {
  account: '',
  password: '',
}
const LOGIN_BTN_LOADING = false
const FORM_RULES = {
  account: [{ required: true, message: '账号必填', type: 'error' }],
  password: [{ required: true, message: '密码必填', type: 'error' }],
}
const formData = ref({ ...INITIAL_DATA })
const loginBtnLoading = ref(LOGIN_BTN_LOADING)
const router = useRouter()
const useStore = getUserStore()
const onSubmit = async ({ validateResult }) => {
  if (validateResult === true) {
    loginBtnLoading.value = true
    try {
      await login(formData.value.account, md5(formData.value.password))
        .then((resp) => {
          loginBtnLoading.value = false
          MessagePlugin.success('登录成功!')
          router.push({ name: 'chooseRole', params: { showHeader: 'login' } })
          useStore.logIn(formData.value.account)
        })
        .catch((err) => {
          console.log(err)
          MessagePlugin.error('登录错误!')
          loginBtnLoading.value = false
        })
      console.log('log')
    } catch (e) {
      console.log(e)
    }
  } else {
    await MessagePlugin.error('用户名或密码不符合格式！')
    loginBtnLoading.value = false
  }
}
const pushToEnroll = (showArea) => {
  router.push({ name: 'enroll', params: { showArea: showArea } })
}
</script>

<style scoped lang="less">
#login-area {
  position: absolute;
  height: 400px;
  width: 300px;
  color: #2c3e50;
  background-color: rgba(255, 255, 255, 20%);
  border-radius: 10%;
  top: 20%;
  overflow: hidden;
  left: 70%;

  .sign-in-check-area {
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
