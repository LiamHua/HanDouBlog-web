<template>
  <div class="article">
    <bean-user-header></bean-user-header>
    <article-head
      :title="article.articleTitle"
      :createTime="article.createTime"
      :viewCount="article.viewCount">
    </article-head>
    <div class="content">
      <mavon-editor
        ref="md"
        v-model="article.articleContent"
        :subfield="false"
        defaultOpen="preview"
        :toolbarsFlag="false"
        :editable="false"
        :scrollStyle="true"
        :ishljs="true"/>
    </div>
    <login></login>
  </div>
</template>

<script>
import BeanUserHeader from '@/components/user/bean-user-header'
import ArticleHead from '@/components/head/article-head'
import { getArticleById } from '@/api/article'

export default {
  name: 'Article',
  components: {
    BeanUserHeader,
    ArticleHead
  },
  data () {
    return {
      article: {
        articleTitle: '',  // 标题
        articleContent: '',  // 正文
        articleImg: '',  // 封面图
        viewCount: 0,  // 阅读量
        starCount: 0,  // 点赞量
        collectCount: 0,  // 收藏量
        commentCount: 0,  // 评论量
        createTime: 0,  // 创建时间
        updateTime: 0,  // 更新时间
        status: 1,  // 状态
        isSecret: 0,  // 是否加密
        isComment: 1,  // 是否开启评论
        isTop: 0  // 是否置顶
      }
    }
  },
  created () {
    this.getArticle(this.$route.params.id)
  },
  methods: {
    // 根据id获取文章
    getArticle: async function (id) {
      const { data: res } = await getArticleById(id)
      // 后端fastjson序列化时会将\n转义为\\n，这里将其还原
      res.data.articleContent = res.data.articleContent.replace(/\\n/g, '\n')
      this.article = res.data
      // 修改页面标题
      document.title = this.article.articleTitle
    }
  }
}
</script>

<style lang="less" scoped>
.article {
  display: flex;
  flex-direction: column;
}

/deep/ .v-note-navigation-wrapper {
  height: 500px !important;
  overflow: auto;
}

.content {
  width: 1100px;
  height: 3000px;
  margin: 50px auto;
}
</style>