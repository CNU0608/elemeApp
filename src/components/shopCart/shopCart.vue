<template>
	<div class="shopcart-wrapper">
		<div class="shopcart">
			<div class="content" @click="toggleList">
				<div class="content-l">
					<div class="logo-wrapper">
						<div class="logo" :class="{'highlight':totalPrice>0}">
							<i class="icon-shopping_cart"></i>
						</div>
						<div class="num" v-show="totalPrice>0">{{totalCount}}</div>
					</div>
					<div class="price">￥{{totalPrice}}</div>
					<div class="desc">另外配送费￥{{deliveryPrice}}元</div>
				</div>
				<div class="content-r">
					<div class="pay" :class="payClass" @click.stop.prevent="pay">{{payDesc}}</div>
				</div>
			</div>
			<div class="ball-container">
				<template v-for="ball in balls">
					<transition v-on:before-enter="beforeEnter"
											v-on:after-enter="afterEnter"
											v-on:enter="enter">
						<div v-show="ball.show" class="ball">
							<div class="inner inner-hook"></div>
						</div>
					</transition>
				</template>
			</div>
			<transition name="fold">
				<div class="shopcart-list" v-show="listShow">
					<div class="list-header">
						<h1 class="title">购物车</h1>
						<span class="empty" @click="empty">清空</span>
					</div>
					<div id="list-content" class="list-content">
						<ul>
							<li class="food" v-for="food in selectFoods">
								<span class="name">{{food.name}}</span>
								<div class="price">
									<span>￥{{food.price * food.count}}</span>
								</div>
								<div class="cartcontrol-wrapper">
									<cart-control :food="food"></cart-control>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</transition>
		</div>
		<!-- 遮罩层 -->
		<transition name="fade">
			<div class="list-mask"
					 v-show="listShow"
					 @click="hideList"></div>
		</transition>
	</div>
</template>
<script type="text/ecmascript-6">
	import BScroll from 'better-scroll'
	import cartControl from 'components/cartcontrol/cartcontrol.vue'
	export default {
	  props: {
	    selectFoods: {
	      type: Array,
	      /* 数组和对象，default必须为一个函数 */
	      default() {
	        return [
	          {
	            price: 10,
	            count: 1
	          }
	        ]
	      }
	    },
	    // 起送价钱
	    minPrice: {
	      type: Number,
	      default: 0
	    },
	    // 配送费
	    deliveryPrice: {
	      type: Number,
	      default: 0
	    }
	  },
	  data() {
	    return {
	      fold: true,
	      dropBalls: [],
	      balls: [
	        {
	          show: false
	        },
	        {
	          show: false
	        },
	        {
	          show: false
	        },
	        {
	          show: false
	        },
	        {
	          show: false
	        }
	      ]
	    }
	  },
	  computed: {
	    totalCount() {
	      let count = 0
	      this.selectFoods.forEach((food) => {
	        count += food.count
	      })
	      return count
	    },
	    totalPrice() {
	      let total = 0
	      this.selectFoods.forEach((food) => {
	        total += food.count * food.price
	      })
	      return total
	    },
	    /* 描述：起送、价格、计算三种状态 */
	    payDesc() {
	      if (this.totalPrice === 0) {
	        return `￥${this.minPrice}元起送`
	      } else if (this.totalPrice < this.minPrice) {
	        let diff = this.minPrice - this.totalPrice
	        return `还差${diff}元起送`
	      } else {
	        return '去结算'
	      }
	    },
	    // 结算按钮显示状态
	    payClass() {
	      if (this.totalPrice < this.minPrice) {
	        return 'not-enought'
	      } else {
	        return 'enought'
	      }
	    },
	    // 控制购物详情是否可以显示
	    listShow() {
	      if (!this.totalCount) {
	        this.fold = true
	        return
	      }
	      let show = !this.fold

	      // 初始化 / 刷新 BScroll
	      if (show) {
	        this.$nextTick(() => {
	          if (!this.scroll) {
	            this.scroll = new BScroll(document.getElementById('list-content'), {
	              click: true
	            })
	          } else {
	            this.scroll.refresh()
	          }
	        })
	      }
	      return show
	    }
	  },
	  methods: {
	    toggleList() {
	      if (!this.totalCount) {
	        return
	      }
	      this.fold = !this.fold
	    },
	    empty() {
	      // 清空购物车
	      this.selectFoods.forEach(food => {
	        food.count = 0
	      })
	    },
	    hideList() {
	      this.fold = true
	    },
	    drop(el) {
	      // console.log(el)
	      for (let i=0; i < this.balls.length; i++) {
	        let ball = this.balls[i]
	        if (!ball.show) {
	          ball.show = true
	          ball.el = el
	          this.dropBalls.push(ball)
	          return
	        }
	      }
	    },
	    beforeEnter(el) {
	      // el指向的是运动的dom
	      let count = this.balls.length
	      while (count--) {
	        let ball = this.balls[count]
	        if (ball.show) {
	          let rect = ball.el.getBoundingClientRect()
	          let x = rect.left - 20
	          let y = -(window.innerHeight - rect.top - 20)
	          el.style.webkitTransform = `translate3d(0,${y}px,0)`
	          el.style.transform = `translate3d(0,${y}px,0)`
	          let inner = el.querySelector('.inner-hook')
	          inner.style.webkitTransform = `translate3d(${x}px,0,0)`
	          inner.style.transform = `translate3d(${x}px,0,0)`
	        }
	      }
	    },
	    enter(el) {
	      /* eslint-disable no-unused-vars */
	      let rg = el.offsetHeight
	      this.$nextTick(() => {
	        el.style.webkitTransform = 'translate3d(0,0,0)'
	        el.style.transform = 'translate3d(0,0,0)'
	        let inner = el.querySelector('.inner-hook')
	        inner.style.webkitTransform = 'translate3d(0,0,0)'
	        inner.style.transform = 'translate3d(0,0,0)'
	      })
	    },
	    afterEnter(el) {
	      let ball = this.dropBalls.shift()
	      if (ball) {
	        ball.show = false
	        el.style.display = 'none'
	      }
	    },
	    pay() {
	      if (this.totalPrice < this.minPrice) {
	        alert('起送金额不足')
	        return
	      }
	      alert(`支付${this.totalPrice + this.deliveryPrice}元,包含配送费${this.deliveryPrice}元`)
	    }
	  },
	  components: {
	    cartControl
	  }
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/color.styl'
	.shopcart-wrapper
		.shopcart
			position fixed
			bottom 0
			left 0
			z-index 50
			height 46px
			width 100%
			.content
				display flex
				background-color $shopCartBackground
				color rgba(255,255,255,.4)
				.content-l
					flex 1
					font-size 0
					.logo-wrapper
						display inline-block
						position relative
						top -8px
						padding 6px
						width 54px
						height 54px
						box-sizing border-box
						vertical-align top
						border-radius 50%
						background $shopCartBackground
						.num
							position absolute
							top 0
							right 0
							width 24px
							height 16px
							line-height 16px
							text-align center
							border-radius 16px
							font-size 9px
							font-weight 700
							color #fff
							background-color $tabFocus
							box-shadow 0 4px 8px 0 rgba(0,0,0,.4)
						.logo
							width 100%
							height 100%
							border-radius 50%
							text-align center
							background-color $shopCartIconBackround
							.icon-shopping_cart
								line-height 44px
								font-size 24px
								color $shopCartIcon
							&.highlight
								background-color rgb(0,160,220)
								.icon-shopping_cart
									color #fff
					.price
						display inline-block
						width 53px
						vertical-align top
						line-height 24px
						margin-top 12px
						box-sizing border-box
						padding 0 12px 0 6px
						border-right 1px solid rgba(255,255,255,.1)
						font-size 16px
						font-weight 700
						&.highlight
							color #fff
					.desc
						display inline-block
						vertical-align top
						line-height 24px
						margin 12px 0 0 12px
						font-size 10px
						font-weight 700
				.content-r
					flex 0 0 106px
					width 106px
					.pay
						height 46px
						line-height 46px
						text-align center
						font-size 12px
						font-weight 700
						&.not-enought
							background-color $shopButtonGrey
						&.enought
							background-color #00b43c
							color #fff
			.ball-container
				.ball
					position fixed
					left 20px
					bottom 20px
					transition all .4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
					.inner
						width 16px
						height 16px
						transition all .4s linear
						border-radius 50%
						background-color rgb(0, 160, 220)
			.shopcart-list
				position absolute
				top 0
				left 0
				width 100%
				z-index -1
				transform translate3d(0, -100%, 0)
				&.fold-enter-active, &.fold-leave-active {
					transition all .5s
				}
				&.fold-enter, &.fold-leave-active {
					transform translate3d(0, 0, 0)
				}
				.list-header
					height 46px
					line-height 46px
					padding 0 10px
					background-color #f3f5f7
					border-bottom 1px solid $borderColor
					.title
						float left
						font-size 14px
						color rgb(7,17,27)
					.empty
						float right
						font-size 12px
						color rgb(0,160,220)
				.list-content
					padding 0 18px
					max-height 217px
					overflow hidden
					background-color #fff
					.food
						position relative
						padding 12px 0
						box-sizing border-box
						border-b()
						.name
							line-height 24px
							font-size 14px
							color $goodsFoodsName
						.price
							position absolute
							right 90px
							bottom 12px
							line-height 24px
							font-weight 700
							font-size 14px
							color $tabFocus
						.cartcontrol-wrapper
							position absolute
							right 0
							bottom 6px
		.list-mask
			position fixed
			top 0
			left 0
			width 100%
			height 100%
			z-index 40
			backdrop-filter blur(10px)
			background-color rgba(7, 17, 27, 0.6)
			&.fade-enter-active, &.fade-leave-active
				transition all .5s
				opacity 1
			&.fade-enter, &.fade-leave-active
				opacity 0
				background-color rgba(7, 17, 27, 0)
</style>
