<template>
  <div class="footer">
    <div class="introduction">
      <div class="introduction-text">
        <h2>憨豆博客</h2>
        <p>憨豆博客是一个开源博客平台</p>
      </div>
      <div class="community">
        <h2>开源社区</h2>
        <ul class="community-list">
          <li><a href="https://gitee.com/LiamHua">Gitee</a></li>
          <li><a href="https://github.com/LiamHua">Github</a></li>
          <li><a href="https://blog.csdn.net/LAf_HUAZAI">CSDN</a></li>
        </ul>
      </div>
      <div class="contact">
        <h2>联系我们</h2>
        <p>Email: liamhuazai@gmail.com</p>
        <img src="https://pictures.huazai.vip/uPic/wechat-code.png" alt="联系我们">
      </div>
    </div>
    <el-divider></el-divider>
    <div class="record">
      <p>Copyright © 2021 @WIT-Software-Liam | 鄂ICP备19024304号-4</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>

<style lang="less" scoped>
.footer {
  // 上部280px，下部50px，中间分割线1px
  height: 331px;
  display: flex;
  flex-direction: column;
  color: #cbd1d3;
  background-color: #1d2b34;
}

.introduction {
  height: 240px;
  padding: 20px 200px;
  display: flex;
  justify-content: space-around;

  .community {
    display: flex;
    flex-direction: column;
    align-items: center;

    .community-list {
      list-style: none;
      margin-top: 8px;
      padding: 0;

      li a {
        display: block;
        color: #cbd1d3;
        text-decoration: none;
        margin-bottom: 20px;
      }
    }
  }

  .contact {
    display: flex;
    flex-direction: column;
    align-items: center;

    h2, p {
      margin: 10px;
    }

    img {
      height: 140px;
    }
  }
}

.el-divider {
  margin: 0;
}

.record {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>