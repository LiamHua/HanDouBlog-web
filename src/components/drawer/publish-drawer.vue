<template>
  <div class="drawer">
    <el-drawer
      :with-header="false"
      :visible="show"
      direction="rtl"
      size="25%"
      @close="closeDrawer">
      <div class="article-setting">
        <div class="title">
          <h4>文章设置</h4>
        </div>
        <el-divider></el-divider>
        <div class="base">
          <h4>基本设置</h4>
          <div class="time">
            <p>发表时间:</p>
            <el-date-picker
              v-model="article.createTime"
              type="datetime"
              placeholder="选择日期时间"
              :editable="false"
              value-format="timestamp"
              size="small">
            </el-date-picker>
          </div>
          <div class="open-comment">
            <p>开启评论:</p>
            <el-radio v-model="article.isComment" :label="true">开启</el-radio>
            <el-radio v-model="article.isComment" :label="false">关闭</el-radio>
          </div>
          <div class="is-top">
            <p>是否置顶:</p>
            <el-radio v-model="article.isTop" :label="true">是</el-radio>
            <el-radio v-model="article.isTop" :label="false">否</el-radio>
          </div>
          <div class="secret">
            <p>加密设置:</p>
            <el-radio v-model="article.isSecret" :label="true">是</el-radio>
            <el-radio v-model="article.isSecret" :label="false">否</el-radio>
            <el-input class="secret-input" v-if="article.isSecret" placeholder="请输入密码" v-model="article.secret"
                      show-password></el-input>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="category">
          <h4>分类目录</h4>
          <el-checkbox-group v-model="article.category">
            <el-checkbox :label="item" v-for="item in categoryList" :key="item.id">{{ item.name }}</el-checkbox>
          </el-checkbox-group>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="category.name"
            ref="saveTagInput"
            size="small"
            minlength="1"
            maxlength="10"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm">
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">新增</el-button>
        </div>
        <!--<div class="tag">-->
        <!--  <h4>标签</h4>-->
        <!--</div>-->
        <el-divider></el-divider>
        <div class="abstract">
          <h4>摘要</h4>
          <el-input
            type="textarea"
            :autosize="{ minRows: 5, maxRows: 10}"
            placeholder="请输入摘要内容，如不填写，会从文章中自动截取"
            v-model="article.articleAbstract">
          </el-input>
        </div>
        <el-divider></el-divider>
        <div class="img">
          <h4>封面图</h4>
          <el-upload
            v-if="!article.articleImg"
            class="upload-demo"
            drag
            action=""
            :before-upload="beforeAvatarUpload"
            :http-request="uploadImage">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
          </el-upload>
          <img v-if="article.articleImg" :src="article.articleImg">
          <el-button v-if="article.articleImg" size="mini" @click="deleteArticleImg">删除</el-button>
        </div>
      </div>
      <el-divider></el-divider>
      <div class="submit">
        <el-button size="medium">保存草稿</el-button>
        <el-button type="primary" size="medium" @click="submitArticle">发布</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { addArticle } from '@/api/article'
import { getPolicy, upload } from '@/api/oss'
import { addCategory, getCategoryList } from '@/api/category'
import randomString from '@/utils/random'
import { isEmpty } from '@/utils/common'

export default {
  name: 'publish-drawer',
  props: {
    article: Object
  },
  computed: {
    show () {
      return this.$store.state.publishDrawerVisible
    }
  },
  created () {
    //刷新分类数据
    this.getCategory()
  },
  data () {
    return {
      category: {
        name: ''
      },
      inputVisible: false,
      categoryList: []
    }
  },
  methods: {
    // 关闭抽屉
    closeDrawer () {
      this.$store.commit('switchPublishDrawerVisible', false)
    },
    // 显示增加分类输入框
    showInput () {
      // 显示输入框
      this.inputVisible = true
      // 聚焦
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // 增加分类
    async handleInputConfirm () {
      if (this.category.name.length === 0) {
        this.inputVisible = false
        return
      }
      const { data: res } = await addCategory(this.category)
      if (res.status !== 1001) {
        this.$message.error('添加失败')
      }
      // 隐藏输入框并清空输入框数据
      this.inputVisible = false
      this.category.name = ''
      //刷新分类数据
      await this.getCategory()
    },
    // 获取分类列表
    async getCategory () {
      const { data: res } = await getCategoryList()
      if (res.status !== 1001) {
        this.$message.error('获取分类列表失败')
        return
      }
      this.categoryList = res.data
    },
    // 图片上传前验证
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png'
      const isLt8M = file.size / 1024 / 1024 < 8

      if (!isJPG) {
        this.$message.error('请上传图片!')
        return false
      }
      if (!isLt8M) {
        this.$message.error('图片大小限制为8MB')
        return false
      }
      return true
    },
    // 图片上传（选取图片后即时上传）
    // TODO 需要防止恶意上传
    async uploadImage (param) {
      let file = param.file
      let { data: res } = await getPolicy()
      if (res.status !== 1001) {
        this.$message.error('获取图片签名信息失败')
        return
      }
      let policyData = res.data
      let ossUrl = policyData.host//填写自己OSS服务器的地址
      let accessUrl = policyData.dir + randomString() + '-' + file.name//设置上传的访问路径
      let sendData = new FormData()// 上传文件的data参数
      sendData.append('OSSAccessKeyId', policyData.accessid)
      sendData.append('policy', policyData.policy)
      sendData.append('Signature', policyData.signature)
      sendData.append('keys', policyData.dir)
      sendData.append('key', accessUrl)//上传的文件路径
      sendData.append('success_action_status', 200) // 指定返回的状态码
      sendData.append('type', 'image/jpeg')
      sendData.append('file', file)
      await upload(ossUrl, sendData).then(response => {
        if (response.status === 200) {
          // _cover 表示OSS图片处理样式
          this.article.articleImg = ossUrl + '/' + accessUrl + '_cover'
        } else {
          this.$message.error('图片上传失败，请重试')
        }
      })
    },
    // 删除封面图（此时图片已上传，不会删除OSS内的图片）
    deleteArticleImg () {
      this.article.articleImg = ''
    },
    // 发表文章
    async submitArticle () {
      // 检测密码
      if (this.article.isSecret && isEmpty(this.article.secret)) {
        this.$message.error('请输入访问密码')
        return
      }
      // 检测分类
      if (isEmpty(this.article.category)) {
        this.$message.error('请至少选择1个分类')
        return
      }
      // 检测是否输入文章摘要
      if (isEmpty(this.article.articleAbstract)) {
        // 截取至多200个字符作为摘要
        this.article.articleAbstract = this.article.articleContent.substr(0,200)
      }
      this.article.createTime = Math.round(this.article.createTime/1000)
      // 提交
      const {data: res} = await addArticle(this.article)
      if (res.status !== 1001) {
        this.$message.error('提交失败')
        return
      }
      await this.$router.push('/user/华仔')
    }
  }
}
</script>

<style lang="less" scoped>
.article-setting {
  padding: 5px 20px;
}

/deep/ .el-drawer.rtl {
  overflow: scroll;
}

.base {
  p {
    font-size: 14px;
    font-weight: 500;
  }

  .time .open-comment .is-top .secret {
    margin: 5px 0 20px 0
  }

  .secret-input {
    margin-top: 10px;
    width: 350px;
  }
}

.category {
  .add-category {
    margin-top: 15px;
  }

  .button-new-tag {
    margin-top: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-top: 10px;
    vertical-align: bottom;
  }
}

.img {
  display: flex;
  flex-direction: column;
}

.submit {
  width: 100%;
  position: fixed;
  bottom: 0;
  padding: 10px 20px;
  background-color: white;
}
</style>