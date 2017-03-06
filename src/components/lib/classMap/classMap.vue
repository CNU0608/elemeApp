<template>
 	<span class="classMap-base" :class="typeClass"></span>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      // 索引
      index: {
        type: Number
      },
      // 类型
      type: {
        type: Number
      }
    },
    computed: {
      typeClass() {
        return 'class-map-' + this.type + ' ' + this.classMap[this.index]
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
 	@import '../../../common/stylus/mixin.styl'
	.class-map-1
		display inline-block
		width 12px
		height 12px
		vertical-align top
		background-size 100%
		background-repeat no-repeat
		margin-right 6px
		&.decrease
			bg-image('decrease_1')
		&.discount
			bg-image('discount_1')
		&.special
			bg-image('special_1')
		&.invoice
			bg-image('invoice_1')
		&.guarantee
			bg-image('guarantee_1')
	.class-map-2
		display inline-block
		width 16px
		height 16px
		vertical-align top
		background-size 100%
		background-repeat no-repeat
		margin-right 6px
		&.decrease
			bg-image('decrease_2')
		&.discount
			bg-image('discount_2')
		&.special
			bg-image('special_2')
		&.invoice
			bg-image('invoice_2')
		&.guarantee
			bg-image('guarantee_2')
	.class-map-3
		display inline-block
		width 12px
		height 12px
		vertical-align top
		background-size 100%
		background-repeat no-repeat
		margin-right 6px
		&.decrease
			bg-image('decrease_3')
		&.discount
			bg-image('discount_3')
		&.special
			bg-image('special_3')
		&.invoice
			bg-image('invoice_3')
		&.guarantee
			bg-image('guarantee_3')
</style>
