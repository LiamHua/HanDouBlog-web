<template>
  <div class="bean-user-header">
    <el-link class="user-index" :underline="false" @click="toHome">主页</el-link>
    <el-link :underline="false" @click="toArticleList">归档</el-link>
    <el-input class="search" suffix-icon="el-icon-search" placeholder="按Enter键搜索"></el-input>
    <el-link class="write" :underline="false" @click="toWrite">写点什么</el-link>
    <el-button v-if="!flag" @click="showLogin">登陆</el-button>
    <div class="avatar">
      <el-dropdown @command="clickDropdown">
        <el-avatar v-if="flag" :src="userInfo.headUrl"></el-avatar>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="userInfo">个人中心</el-dropdown-item>
          <el-dropdown-item command="logout">退出登陆</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { logout, getUserInfo } from '@/api/user'

export default {
  name: `BeanUserHeader`,
  data () {
    return {
      userInfo: {
        id: 0,
        username: '',
        nickname: '',
        headUrl: '',
        introduction: '',
        sex: '',
        job: '',
        location: '',
        status: 1,
        createTime: 0,
        updateTime: 0
      },
      flag: localStorage.token !== undefined,
      dropDownVisible: false
    }
  },
  async created () {
    if (localStorage.token) {
      const { data: res } = await getUserInfo()
      if (res.status !== 1001) {
        this.$message.error('获取当前用户信息失败，请重试')
      }
      this.userInfo = res.data
    }
  },
  methods: {
    toHome () {
      if (localStorage.token) {
        this.$router.push({ name: 'UserHome', params: { nickname: this.userInfo.nickname } })
        return
      }
      this.$store.commit('switchShowLogin', true)
    },
    toArticleList () {
    },
    toWrite () {
      this.$router.push("/write")
    },
    // 登陆
    showLogin () {
      this.$store.commit('switchShowLogin', true)
    },
    // 点击头像处下拉菜单
    async clickDropdown (command) {
      // 进入个人中心
      if (command === 'userInfo') {

      } else if (command === 'logout') {
        // 退出登陆
        const { data: res } = await logout()
        if (res.status === 1001) {
          localStorage.removeItem('token')
          // 临时使用
          this.$router.push("/user/华仔")
          location.reload()
        } else {
          this.$message.error('操作失败')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.bean-user-header {
  height: 30px;
  background-color: #fff;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 7px 25px;
}

.user-index {
  margin-right: 35px;
}

.search {
  width: 180px;
  margin: 0 35px;

  /deep/ .el-input__inner {
    height: 30px;
    border-radius: 50px;
  }

  /deep/ .el-input__suffix {
    display: flex;
    align-items: center;
  }
}

.write {
  margin-right: 20px;
}

.el-dropdown {
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-button {
  border: none;
  height: 35px;
  padding: 10px 20px;
}
</style>