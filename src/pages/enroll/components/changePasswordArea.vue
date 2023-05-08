<template>
  <div id="ChangePasswordArea">
    <div class="forgot-password-area">
      <h1 style="text-align: left; margin-left: 20px; margin-top: 40px">通过邮箱</h1>
      <p style="text-align: left; margin-left: 20px">找回密码</p>
      <div class="reset-password-input-area" style="margin-top: 40px">
        <t-form
          ref="form"
          :data="formData"
          :colon="true"
          class="t-form"
          size="large"
          label-width="70px"
          @reset="onReset"
          @submit="onSubmit"
        >
          <t-form-item name="email" class="reset-password-form-item" label="邮箱">
            <t-input v-model="formData.email" clearable placeholder="请输入邮箱"> </t-input>
          </t-form-item>
          <t-form-item name="password" class="reset-password-form-item" label="密码">
            <t-input v-model="formData.password" type="password" clearable placeholder="请输入密码"> </t-input>
          </t-form-item>
          <t-form-item name="password_confirmed" class="reset-password-form-item" label="确认密码">
            <t-input v-model="formData.passwordConfirmed" type="password" clearable placeholder="请再次输入密码">
            </t-input>
          </t-form-item>
          <t-form-item name="verify_code" class="reset-password-form-item" label="验证码">
            <t-input v-model="formData.verifyCode" clearable placeholder="请输入验证码"> </t-input>
            <t-button theme="default" variant="outline" style="margin-left: 10px"> 获取验证码 </t-button>
          </t-form-item>
          <t-button
            theme="primary"
            type="submit"
            block
            style="margin-left: 60px; margin-right: 60px; margin-top: 35px; width: 75%"
            >确认修改</t-button
          >
        </t-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ChangePasswordArea',
  data() {
    return {
      formData: {
        email: '',
        password: '',
        passwordConfirmed: '',
        verifyCode: '',
      },
    }
  },
  methods: {
    onReset() {
      this.$message.success('重置成功')
    },
    onSubmit({ validateResult, firstError }) {
      if (validateResult === true) {
        this.$message.success('提交成功')
      } else {
        console.log('Errors: ', validateResult)
        this.$message.warning(firstError)
      }
    },
  },
}
</script>
<script lang="ts" setup></script>

<style scoped lang="less">
#ChangePasswordArea {
  position: absolute;
  width: 480px;
  height: 540px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.5);
  overflow: hidden;
  .reset-password-input-area {
    .t-form {
      margin-top: 30px;

      .reset-password-form-item {
        margin-left: 20px;
        margin-right: 20px;
        margin-top: 20px;
      }
    }
  }
}
</style>
