<template>
  <div class="home">
    <!--登陆对话框-->
    <div class="nav">
      <bean-logo></bean-logo>
      <el-button @click="showLogin">登陆</el-button>
    </div>
    <div class="content">
      <img class="img" src="https://bean.huazai.vip/cover-image/01597524953798099034609366112857-background.jpg" alt="">
    </div>
    <bean-footer></bean-footer>
    <login></login>
  </div>
</template>

<script>
import BeanLogo from '@/components/logo'
import BeanFooter from '@/components/footer'


export default {
  name: 'Home',
  components: {
    BeanLogo,
    BeanFooter
  },
  data () {
    return {}
  },
  methods: {
    // 登陆
    showLogin () {
      this.$store.commit('switchShowLogin', true)
    }
  }
}
</script>

<style lang="less" scoped>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .el-button {
    border: none;
    height: 35px;
    padding: 10px 20px;
  }
}

.img {
  height: auto;
  width: 100%;
}
</style>
