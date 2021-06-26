<template>
  <div class="article-head">
    <div class="title">
      <h1>{{ title }}</h1>
    </div>
    <div class="article-info">
      <el-avatar class="article-info-item" :src="avatarURL"></el-avatar>
      <el-link class="article-info-item" :underline="false">华仔</el-link>
      <span class="article-info-item">{{ createTime | formatDate }}</span>
      <span class="article-info-item">{{ viewCount }}次阅读</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'article-head',
  props: {
    title: String,
    createTime: Number,
    viewCount: Number
  },
  data () {
    return {
      avatarURL: 'https://bean.huazai.vip/cover-image/19608507998243549438864915840260-blog.png'
    }
  }
}
</script>

<style lang="less" scoped>
.article-head {
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px 500px;
  background-image: url("https://img.ixintu.com/download/jpg/202010/f1f3528791a1437f0b66b95de12f17f2_800_355.jpg!con");
}

.title {
  color: white;
}

.article-info {
  display: flex;
  align-items: center;

  .article-info-item {
    margin-right: 12px;
    color: white;
  }

}
</style>