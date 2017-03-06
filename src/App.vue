<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-y-1px">
      <div class="item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="item">
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class="item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>

    <!-- seller 通过 router-view 传递给 goods 组件 -->
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from './components/header/header'

  const ERR_OK = 0

  /* export default 是一个语法糖，将整个组件作为 module.export 导出 */
  export default {
    data() {
      return {
        seller: {}
      }
    },
    created() {
      this.$http.get('/api/seller').then((res) => {
        res = res.body
        if (res.errno === ERR_OK) {
          this.seller = res.data
        }
      })
    },
    components: {
      'v-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/border-1px.styl"
  #app
    .tab
      display flex
      height 40px
      line-height 40px
      text-align center
      border-b()
      .item
        flex 1
        &>a
          display block
          font-size 14px
          color rgb(77,85,93)
          &.active
            color rgb(240,20,20)
</style>
