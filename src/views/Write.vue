<template>
  <div class="write">
    <bean-user-header></bean-user-header>
    <div class="head">
      <h2>{{ article.articleTitle ? article.articleTitle : '新文章' }}</h2>
      <div class="menu">
        <el-button size="medium">保存草稿</el-button>
        <el-button size="medium">预览</el-button>
        <el-button type="primary" size="medium" @click="openDrawer">发布</el-button>
      </div>
    </div>
    <div class="content">
      <el-input class="title"
                placeholder="请输入文章标题"
                v-model="article.articleTitle"
                maxlength="20"
                show-word-limit>
      </el-input>
      <mavon-editor
        ref="md"
        v-model="article.articleContent"/>
    </div>
    <!--发布文章的抽屉-->
    <publish-drawer :article="article"></publish-drawer>
  </div>
</template>

<script>
import BeanUserHeader from '@/components/user/bean-user-header'
import PublishDrawer from '@/components/drawer/publish-drawer'
import { isEmpty } from '@/utils/common'



export default {
  name: 'Write',
  components: {
    BeanUserHeader,
    PublishDrawer
  },
  data () {
    return {
      article: {
        articleTitle: '',  // 标题
        articleContent: '',  // 正文
        articleAbstract: '',  // 摘要
        articleImg: '',  // 封面图
        category: [],  // 分类
        viewCount: 0,  // 阅读量
        starCount: 0,  // 点赞量
        collectCount: 0,  // 收藏量
        commentCount: 0,  // 评论量
        createTime: '',  // 创建时间
        updateTime: '',  // 更新时间
        status: 1,  // 状态
        isSecret: false,  // 是否加密
        secret: '',  // 密码
        isComment: true,  // 是否开启评论
        isTop: false  // 是否置顶
      }
    }
  },
  methods: {
    // 显示发布文章的抽屉
    openDrawer () {
      if (isEmpty(this.article.articleTitle)) {
        this.$message.error('文章标题不能为空')
        return
      }
      if (isEmpty(this.article.articleContent)) {
        this.$message.error('文章内容不能为空')
        return
      }
      // 更新文章发布时间
      this.article.createTime = new Date().getTime()
      this.$store.commit('switchPublishDrawerVisible', true)
    }
  }
}
</script>

<style lang="less" scoped>
.write {
  background-color: #f0f2f5;
}

.head {
  height: 60px;
  width: 1500px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.content {
  width: 1500px;
  margin: 0 auto;

  .title {
    margin: 10px 0 20px 0;
  }

  /deep/ .v-note-edit {
    min-height: 75vh;
  }
}
</style>