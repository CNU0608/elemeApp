<template>
	<div class="cart-control">
		<!-- 一个层负责滚动 一个层负责平移 -->
		<transition name="move">
			<div class="cart-decrease"
					 v-show="food.count>0"
					 @click="decreaseCart">
				<span class="inner icon-remove_circle_outline"></span>
			</div>
		</transition>
		<div class="cart-count" v-show="food.count>0">{{food.count}}</div>
		<div class="cart-increase icon-add_circle"
				 @click="increaseCart"></div>
	</div>
</template>
<script type="text/ecmascript-6">
	import Vue from 'vue'
	export default {
	  props: {
	    food: {
	      type: Object,
	      default: 0
	    }
	  },
	  methods: {
	    increaseCart(event) {
	      if (!event._constructed) {
	        return
	      }
	      if (!this.food.count) {
	        // 给一个对象添加原本不存在的属性时，需要用到Vue.set()这个接口
	        // 这样的话，新增的属性才会添加一个观察者，新增属性的变化就能被vue观测到
	        // 否则，添加的只是一个普通属性，并不会实时更新到DOM上
	        Vue.set(this.food, 'count', 1)
	      } else {
	        this.food.count++
	      }

	      // 使用$emit派发事件本身 让父组件监听
	      this.$emit('addCart', event.target)
	    },
	    decreaseCart(event) {
	      if (!event._constructed) {
	        return
	      }
	      if (this.food.count) {
	        this.food.count--
	      }
	    }
	  }
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/color.styl'
	.cart-control
		font-size 0
		.cart-decrease
			display inline-block
			padding 6px
			transform translate3d(0, 0, 0)
			&.move-enter-active, &.move-leave-active
				transition all .4s linear
				.inner
					transition all .5s linear
			&.move-enter, &.move-leave-active
				opacity 0
				transform translate3d(24px, 0, 0)
				.inner
					opacity 0
					transform rotate(360deg)
			.inner
				display inline-block
				line-height 24px
				font-size 24px
				color rgb(0, 160, 220)
		.cart-count
			display inline-block
			vertical-align top
			width 16px
			line-height 24px
			font-size 12px
			color rgb(147, 153, 159)
			margin-top 6px
		.cart-increase
			display inline-block
			line-height 24px
			padding 6px
			font-size 24px
			color rgb(0, 160, 220)
</style>
