<template>
  <div class="user-home">
    <bean-user-header></bean-user-header>
    <bean-user-nav :nickname="nickname"></bean-user-nav>
    <div class="blog-container">
      <div v-for="item in articleList" :key="item.id">
        <bean-blog-preview :article="item"></bean-blog-preview>
        <el-divider></el-divider>
      </div>
      <p class="load-tip" v-if="loading">加载中...</p>
      <p class="load-tip" v-if="noMore">没有更多了</p>
    </div>
    <login></login>
  </div>
</template>

<script>
import BeanUserHeader from '@/components/user/bean-user-header'
import BeanBlogPreview from '@/components/blog-preview'
import BeanUserNav from '@/components/head/user-nav'

import { listArticle } from '@/api/article'

export default {
  name: 'UserHome',
  components: {
    BeanUserHeader,
    BeanBlogPreview,
    BeanUserNav
  },
  data () {
    return {
      pageNo: 1,  // 当前页码
      pageSize: 5,  // 每页数据量
      total: 0,  // 数据量总数
      pages: 0,  // 页码总数
      articleList: [],  // 博客列表
      loading: false,  // 加载更多标志
      nickname: this.$route.params.nickname
    }
  },
  computed: {
    // 页数到末尾
    noMore () {
      return this.pageNo === this.pages
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
  created () {
    // 初始化博客列表
    this.initArticleList()
    window.addEventListener('scroll', this.loadMore)
  },
  destroyed () {
    window.removeEventListener('scroll', this.loadMore)
    //页面离开后销毁，防止切换路由后上一个页面监听scroll滚动事件会在新页面报错问题
  },
  methods: {
    async initArticleList () {
      const { data: res } = await listArticle(this.nickname, this.pageNo, this.pageSize)
      console.log(res)
      this.total = res.data.total
      this.pages = Math.ceil(this.total / this.pageSize)
      this.articleList = this.articleList.concat(res.data.records)
    },
    // 加载更多
    async loadMore () {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      let clientHeight = document.documentElement.clientHeight
      let scrollHeight = document.documentElement.scrollHeight
      if (!this.noMore) {
        if (scrollTop + clientHeight >= scrollHeight) {
          console.log('加载更多')
          this.loading = true
          this.pageNo++
          setTimeout(() => {
            this.initArticleList()
            this.loading = false
          }, 1000)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.user-info {
  width: 500px;
  margin: 60px auto;
  text-align: center;
  color: red;

  .username {
    font-size: 45px;
  }

  .user-introduction {
    font-size: 18px;
  }
}


.blog-container {
  width: 1200px;
  margin: 0 auto;
  height: 1000px;
  padding: 50px 50px;

  .load-tip {
    text-align: center;
  }
}

.blog-container::-webkit-scrollbar {
  display: none;
}

</style>