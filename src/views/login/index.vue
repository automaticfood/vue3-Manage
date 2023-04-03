<template>
  <div class="login-container">
    <el-form :model="form" class="login-form" :rules="rules" ref="formEl">
      <div class="title-container">
        <h3 class="title">用户登录</h3>
      </div>
      <el-form-item prop="username">
        <!-- <el-icon icon="" :size="20" class="svg-container"> </el-icon> -->
        <el-icon :size="20" class="svg-container"><User /></el-icon>
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item prop="password">
        <el-icon :size="20" class="svg-container"><Lock /></el-icon>
        <el-input
          :type="isView ? 'text' : 'password'"
          v-model="form.password"
        />
        <el-icon
          v-if="isView"
          :size="20"
          class="svg-container icon-view"
          @click="viewPwd"
        >
          <View />
        </el-icon>
        <el-icon
          v-else
          :size="20"
          class="svg-container icon-view"
          @click="viewPwd"
        >
          <Hide />
        </el-icon>
      </el-form-item>
      <el-button class="login-button" type="primary" @click="submitForm(formEl)"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { Lock, User, View, Hide } from '@element-plus/icons-vue'
  // import { login } from '@/api/login'
  import { useStore } from 'vuex'

  const form = ref({
    username: 'admin',
    password: '123456'
  })
  const rules = ref({
    username: [
      {
        required: true,
        message: 'Please input Activity name',
        trigger: 'blur'
      }
    ],
    password: [
      {
        required: true,
        message: 'Please input Activity name',
        trigger: 'blur'
      }
    ]
  })
  const isView = ref(false)
  const store = useStore()

  function viewPwd() {
    isView.value = !isView.value
  }

  const formEl = ref('formEl')
  const submitForm = async () => {
    await formEl.value.validate((valid, fields) => {
      if (valid) {
        // login(form.value).then((res) => {
        //   console.log(res)
        // })
        store.dispatch('app/login', form.value)
      } else {
        console.log('error submit!', fields)
      }
    })
  }
</script>

<style lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;
  $cursor: #fff;

  .login-container {
    min-height: 100%;
    width: 100%;
    // background-color: $bg;
    background-image: linear-gradient(to top, #09203f 0%, #537895 100%);
    overflow: hidden;

    .login-form {
      position: relative;
      width: 420px;
      max-width: 100%;
      padding: 160px 35px 0;
      margin: 0 auto;
      overflow: hidden;

      :deep(.el-form-item) {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
      }

      :deep(.el-input) {
        display: inline-block;
        height: 47px;
        width: 79%;

        .el-input__wrapper {
          box-shadow: 0 0 0 0px;
          // var(--el-input-border-color, var(--el-border-color)) inset;
          // 去除input白色边框
          background-color: transparent;
          width: 100%;
        }

        input {
          background: transparent;
          border: 0px;
          // -webkit-appearance: none;
          border-radius: 0px;
          padding: 12px 5px 12px 0px;
          color: $light_gray;
          height: 47px;
          caret-color: $cursor;
        }
      }
      .login-button {
        width: 100%;
        box-sizing: border-box;
      }
    }

    .tips {
      font-size: 16px;
      line-height: 28px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }

      :deep(.lang-select) {
        position: absolute;
        top: 4px;
        right: 0;
        background-color: white;
        font-size: 22px;
        padding: 4px;
        border-radius: 4px;
        cursor: pointer;
      }
    }

    .show-pwd {
      // position: absolute;
      // right: 10px;
      // top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }
</style>
