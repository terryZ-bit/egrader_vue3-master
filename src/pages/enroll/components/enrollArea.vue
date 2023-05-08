<template>
  <div id="EnrollArea">
    <h1 style="text-align: left; margin-left: 20px; margin-top: 40px">欢迎注册!</h1>
    <p style="text-align: left; margin-left: 20px">
      已有账号？
      <span style="color: #0052d9" @click="$router.push('/')">登录</span>
    </p>
    <div class="enroll-input-area" style="margin-top: 40px">
      <t-form ref="form" :data="formData" :colon="true" class="t-form" size="large" label-width="70px">
        <t-form-item name="email" class="enroll-form-item" label="邮箱">
          <t-input v-model="formData.email" clearable placeholder="请输入邮箱"> </t-input>
        </t-form-item>
        <t-form-item name="name" class="enroll-form-item" label="昵称">
          <t-input v-model="formData.name" clearable placeholder="请输入昵称"> </t-input>
        </t-form-item>
        <t-form-item name="password" class="enroll-form-item" label="密码">
          <t-input v-model="formData.password" type="password" clearable placeholder="请输入密码"> </t-input>
        </t-form-item>
        <t-form-item name="password_confirmed" class="enroll-form-item" label="确认密码">
          <t-input v-model="formData.passwordConfirmed" type="password" clearable placeholder="请再次输入密码">
          </t-input>
        </t-form-item>
        <t-form-item name="verify_code" class="enroll-form-item" label="验证码">
          <t-input v-model="formData.verifyCode" clearable placeholder="请输入验证码"> </t-input>
          <t-button
            theme="default"
            style="margin-left: 10px"
            :disabled="getVerifyCodeDisabled"
            @click="sendVerifyCode()"
          >
            {{ sCodeButtonText }}
          </t-button>
        </t-form-item>
        <t-button
          theme="primary"
          block
          style="margin-left: 60px; margin-right: 60px; margin-top: 70px; width: 75%"
          @click="onSubmit"
          >注册</t-button
        >
      </t-form>
    </div>
  </div>
</template>

<script lang="ts">
import { enroll, getVerificationCode } from '@/apis/enroll'
import md5 from 'js-md5'
import { MessagePlugin } from 'tdesign-vue-next'

export default {
  name: 'EnrollArea',
  data() {
    return {
      formData: {
        email: '',
        password: '',
        name: '',
        passwordConfirmed: '',
        verifyCode: '',
      },
      getVerifyCodeDisabled: false,
      sCodeButtonText: '获取验证码',
      sCodeTime: 60,
    }
  },
  methods: {
    async onSubmit(validateResult) {
      try {
        await enroll(this.formData.email, md5(this.formData.password), this.formData.name, this.formData.verifyCode)
          .then(() => {
            MessagePlugin.success('注册成功！')
          })
          .catch(() => {
            MessagePlugin.error('注册失败！')
          })
      } catch (e) {
        console.log(e)
      }
    },
    sendVerifyCode() {
      if (this.formData.email.length < 1) {
        MessagePlugin.error('未输入邮箱!')
      } else {
        this.getVerifyCodeDisabled = false
        const me = this
        me.getVerifyCodeDisabled = true
        const interval = window.setInterval(function () {
          me.s_code_button_text = +me.time
          --me.time
          if (me.time < 0) {
            me.s_code_button_text = '重新发送'
            me.time = 60
            me.get_verify_code_disabled = false
            window.clearInterval(interval)
          }
        }, 1000)
      }
      getVerificationCode(this.formData.email, 'enroll')
        .then((resp) => {
          console.log(resp)
          MessagePlugin.success('获取验证码成功!')
        })
        .catch((err) => {
          console.log(err)
          MessagePlugin.error('获取验证码失败!')
        })
    },
  },
}
</script>
<script lang="ts" setup></script>

<style scoped lang="less">
#EnrollArea {
  position: absolute;
  width: 480px;
  height: 620px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.5);
  overflow: hidden;

  .enroll-input-area {
    .t-form {
      margin-top: 30px;
      .enroll-form-item {
        margin-left: 20px;
        margin-right: 20px;
        margin-top: 20px;
      }
    }
  }
}
</style>
