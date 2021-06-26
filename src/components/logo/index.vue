<template>
  <div class="logo">
    <img :src="logo" alt="logo">
    <span>憨豆博客</span>
  </div>
</template>

<script>
export default {
  name: 'BeanLogo',
  data () {
    return {
      logo: require('/src/assets/logo.png')
    }
  }
}
</script>

<style lang="less" scoped>
@logoFont: 12px;
@img-width: 60px;
@logo-width: 200px;
@height: 55px;
@font-size: 20px;

.logo {
  width: @logo-width;
  height: @height;
  color: blue;
  font-size: @font-size;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: @img-width;
    height: @height;
  }
}
</style>