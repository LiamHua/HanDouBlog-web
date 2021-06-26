<template>
  <div class="login">
    <el-dialog title="手机登陆"
               :visible="show"
               width="360px"
               @close="handleCancel"
               top="30vh"
               :close-on-click-modal="false"
               center
               destroy-on-close>
      <div class="loginForm">
        <el-form :model="loginForm" ref="loginFormRef" :rules="loginFormRules" status-icon>
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item prop="smsCode" class="code">
            <el-input v-model="loginForm.smsCode" placeholder="请输入验证码"></el-input>
            <el-button class="getCode" @click="getCode" :disabled="getCodeBtnEnable">{{ getCodeText }}</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">登陆</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getSMSCode, loginWithSMS } from '@/api/auth'
import { telRule, smsRule } from '@/utils/rules.js'

export default {
  name: 'BeanLogin',
  data () {
    return {
      text: '你大爷',
      loginForm: {
        username: '',
        smsCode: ''
      },
      loginFormRules: {
        username: telRule,
        smsCode: smsRule
      },
      getCodeText: '获取验证码',
      timewait: 60,
      getCodeBtnEnable: false
    }
  },
  // 监听登陆对话框显示状态
  computed: {
    show() {
      return this.$store.state.loginDialogVisible
    }
  },
  methods: {
    handleCancel () {
      this.$store.commit('switchShowLogin', false)
    },
    // 获取验证码
    getCode () {
      this.$refs.loginFormRef.validateField('username', async (result) => {
        // 这里结果是相反的，!result 表示通过验证
        if (!result) {
          let { data: res } = await getSMSCode(this.loginForm.username)
          if (res.status === 1001) {
            this.listenTime()
          } else if (res.status === 1002) {
            this.$message.error('获取验证码失败')
          }
        } else {
          this.$message.error('请输入正确的手机号！')
        }
      })
    },
    login () {
      this.$refs.loginFormRef.validate(async (result) => {
        // 通过验证
        if (result) {
          let { data: res } = await loginWithSMS(this.loginForm)
          if (res.status === 1001) {
            localStorage.setItem('token', res.data.token)
            this.$message.success('登陆成功')
            // 临时使用
            this.$router.push("/user/华仔")
            // location.reload()
            this.$store.commit('switchShowLogin', false)
          } else if (res.status === 1002) {
            this.$message.error('登陆失败，请联系管理员')
          } else if (res.status === 1009) {
            this.$message.error('验证码错误')
          }
        }
      })
    },
    // 修改获取验证码按钮状态
    listenTime () {
      if (this.timewait === 0) {
        this.getCodeBtnEnable = false
        this.getCodeText = '获取验证码'
        this.timewait = 60
      } else {
        this.getCodeBtnEnable = true
        this.getCodeText = this.timewait + '秒后重新获取'
        this.timewait--
        setTimeout(() => {
          this.listenTime()
        }, 1000)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
}

/deep/ .el-dialog__body {
  padding: 30px 0 !important;
}

.loginForm {
  width: 360px;
  height: 180px;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .el-input {
    height: 40px;
    width: 270px;
    border-radius: 0;
  }

  .el-form-item {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .code {
    height: 40px;

    .el-input {
      width: 140px;
    }

    .getCode {
      width: 130px;
    }
  }
}
</style>