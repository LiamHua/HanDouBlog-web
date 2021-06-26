<template>
  <div class="bean-blog-preview">
    <div class="content">
      <div class="date">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-date"></use>
        </svg>
        <span class="date-text">{{ article.createTime | formatDate }}</span>
      </div>
      <div class="title">
        <router-link :to="{name: 'Article', params: {id: article.id}}">
          <h2>{{ article.articleTitle }}</h2>
        </router-link>
      </div>
      <div class="abstract">
        <p>{{article.articleAbstract}}</p>
      </div>
      <div class="other">
        <div class="star-count other-item">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-star"></use>
          </svg>
          <span>{{article.starCount}}</span>
        </div>
        <div class="comment_count other-item">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-comment"></use>
          </svg>
          <span>{{article.commentCount}}</span>
        </div>
        <div class="collect-count other-item">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-collect"></use>
          </svg>
          <span>{{article.collectCount}}</span>
        </div>
      </div>
    </div>
    <div class="img">
      <img class="article-img" :src="article.articleImg" alt="背景图片">
    </div>
  </div>
</template>

<script>
export default {
  name: 'BeanBlogPreview',
  props: {
    article: {
      id: '',
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
      isTop: false  // 是否置顶
    }
  }
}
</script>

<style lang="less" scoped>
.bean-blog-preview {
  // 实际height 300 width 1100
  height: 250px;
  width: 1000px;
  display: flex;
  justify-content: space-between;
  padding: 0 50px;
}

.content {
  .date {
    display: flex;
    align-items: center;
  }

  .abstract {
    height: 130px;
    padding-right: 10px;

    p {
      overflow: hidden;
      text-overflow: ellipsis;
      display:-webkit-box; //作为弹性伸缩盒子模型显示。
      -webkit-box-orient:vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
      -webkit-line-clamp:5; //显示的行
    }
  }

  .other {
    width: 300px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .other-item {
      display: flex;
      align-items: center;
    }
  }
}

.article-img {
  width: 360px;
  height: 250px;
}
</style>