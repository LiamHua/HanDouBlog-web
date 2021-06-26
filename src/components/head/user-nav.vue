<template>
  <div class="user-nav" :style="{backgroundImage: 'url(' + userInfo.backUrl + ')' }">
    <div class="user-info">
      <div class="avatar">
        <el-avatar class="avatar-img" :src="userInfo.headUrl"></el-avatar>
      </div>
      <div class="user">
        <h1>{{ userInfo.nickname }}</h1>
        <p class="strong">{{ userInfo.job }}</p>
        <p class="strong location">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-location"></use>
          </svg>
          {{ userInfo.location }}
        </p>
      </div>
    </div>
    <div class="article-info">
      <div class="article-num">
        <p class="num-text">文章</p>
        <p class="num">{{articleNum}}</p>
      </div>
      <div class="category-num">
        <p class="num-text">分类</p>
        <p class="num">{{categoryNum}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserInfoByNickname } from '@/api/user'
import { getCategoryNum } from '@/api/category'
import { getArticleNum } from '@/api/article'

export default {
  name: 'BeanUserNav',
  props: {
    nickname: String
  },
  data () {
    return {
      userInfo: {
        id: 0,
        nickname: '',
        headUrl: '',
        backUrl: '',
        introduction: '',
        sex: '',
        job: '',
        location: ''
      },
      articleNum: 0,
      categoryNum: 0
    }
  },
  created () {
    this.init()
  },
  methods: {
    async init () {
      const { data: res1 } = await getUserInfoByNickname(this.nickname)
      this.userInfo = res1.data
      const { data: res2 } = await getArticleNum(this.nickname)
      this.articleNum = res2.data
      const { data: res3 } = await getCategoryNum(this.nickname)
      this.categoryNum = res3.data
    }
  }
}
</script>

<style lang="less" scoped>
.user-nav {
  height: 300px;
  display: flex;
  align-items: center;
  padding: 0 300px 0 300px;
  color: white;
}

.user-info {
  width: 500px;
  display: flex;

  .user {
    text-align: center;
  }

  .location {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .strong {
    font-weight: 500;
  }
}

.avatar-img {
  height: 150px;
  width: auto;
  margin-right: 80px;
}

.article-info {
  display: flex;
  width: 200px;
  justify-content: space-between;
  text-align: center;

  .num-text {
    font-size: 18px;
    font-weight: 400;
    margin: 0;
  }

  .num {
    font-size: 30px;
    font-weight: 800;
    margin: 5px 0;
  }
}
</style>