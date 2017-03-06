<template>
	<div class="goods">
		<div id="menu-wrapper" class="menu-wrapper">
			<ul>
				<li class="menu-item"
					v-for="(item, index) in goods"
					:class="{'current': currentIndex === index}"
					@click="selectMenu(index, $event)"
					>
					<span class="text border-y-1px">
						<class-map v-if="item.type>0" :index="item.type" :type="3"></class-map>
						{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div id="foods-wrapper" class="foods-wrapper">
			<ul>
				<li class="food-list" v-for="item in goods">
					<h1 class="title">{{ item.name }}</h1>
					<ul>
						<li class="food-item border-y-1px" v-for="food in item.foods">
							<div class="icon">
								<img width="57" height="57" :src="food.icon" :alt="food.name">
							</div>
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<p class="desc">{{food.description}}</p>
								<div class="extra">
									<span class="count">月售{{food.sellCount}}份</span>
									<span>好评率{{food.rating}}</span>
								</div>
								<div class="price">
									<span class="now">￥{{food.price}}</span>
									<span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
								</div>
								<div class="cartcontrol-wrapper">
									<cart-control v-on:addCart="drop" :food="food"></cart-control>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<!-- 访问购物车组件 -->
		<shop-cart ref="shopcart" :select-foods="selectFoods"
							 :min-price="seller.minPrice"
							 :delivery-price="seller.deliveryPrice"></shop-cart>
	</div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import classMap from 'components/lib/classMap/classMap'
  import shopCart from 'components/shopCart/shopCart'
  import cartControl from 'components/cartcontrol/cartcontrol'
  const ERR_OK = 0
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        menuScroll: {},
        foodsScroll: {},
        scrollY: 0,
        // 存储每一个区间的高度
        listHeight: []
      }
    },
    created() {
      this.$http.get('/api/goods').then((res) => {
        res = res.body
        if (res.errno === ERR_OK) {
          this.goods = res.data

          /* 确保DOM已经渲染再去执行 */
          this.$nextTick(() => {
            this._initScroll()
            this._calculateHeight()
          })
        }
      })
    },
    components: {
      classMap,
      shopCart,
      cartControl
    },
    computed: {
      currentIndex() {
        for (let i=0; i<this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i+1]
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i
          }
        }

        if (this.scrollY <= 0) {
          return 0
        } else if (this.scrollY >= this.listHeight[this.listHeight.length - 1]) {
          return this.listHeight.length - 1
        }
      },

      // 已选择的foods
      selectFoods() {
        let foods = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food)
            }
          })
        })
        return foods
      }
    },
    methods: {
      _initScroll() {
        this.menuScroll = new BScroll(document.getElementById('menu-wrapper'), {
          click: true
        })
        this.foodsScroll = new BScroll(document.getElementById('foods-wrapper'), {
          click: true,
          probeType: 3
        })
        this.foodsScroll.on('scroll', (pos) => {
          // console.log(pos.x + '~' + pos.y)
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },

      // 获取元素的高度
      _calculateHeight() {
        let foodsWrapper = document.getElementById('foods-wrapper')
        let foodList = foodsWrapper.getElementsByClassName('food-list')
        let height = 0
        this.listHeight.push(height)
        for (let i=0; i<foodList.length; i++) {
          let item = foodList[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },

      // 点击滑动到对应的区域
      selectMenu(index, event) {
        if (!event._constructed) {
          return
        }
        let foodsWrapper = document.getElementById('foods-wrapper')
        let foodList = foodsWrapper.getElementsByClassName('food-list')
        let el = foodList[index]
        this.foodsScroll.scrollToElement(el, 200, 0, 2)
      },
      drop(el) {
        this.$refs.shopcart.drop(el)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/color.styl'
	@import '../../common/stylus/border-1px.styl'
	.goods
		position absolute
		display flex
		top 169px
		bottom 46px
		width 100%
		overflow hidden
		.menu-wrapper
			flex 0 0 80px
			width 80px
			background-color $goodsMenuBackground
			.menu-item
				// table是垂直居中的最好一种布局
				display table
				height 54px
				line-height 14px
				padding 0 12px
				font-size 0
				&.current
					color #07111b
					background-color #fff
					.text
						border-bottom-none()
				.text
					display table-cell
					width 56px
					vertical-align middle
					font-size 12px
					border-b()
					.class-map-3
						margin-right 2px
		.foods-wrapper
			flex 1
			.title
				width: 100%;
				height 26px
				line-height 26px
				font-size 12px
				color $goodsFoodsTitle
				padding-left 14px
				background-color $goodsmenuBackground
				border-left 2px solid $goodsTitleBorderColor
			.food-item
				display flex
				margin 18px
				padding-bottom 18px
				border-b()
				&:last-child
					border-bottom-none()
					margin-bottom 0
				.icon
					flex 0 0 57px
					margin-right 10px
				.content
					flex 1
					.name
						margin 2px 0 8px 0
						height 14px
						line-height 14px
						font-size 14px
						color $goodsFoodsName
					.desc, .extra
						color $goodsFoodsTitle
						font-size 10px
						line-height 10px
					.desc
						line-height 12px
						margin-bottom 8px
					.extra
						.count
							margin-right 12px
					.price
						line-height 24px
						.now
							color $tabFocus
							font-size 14px
							font-weight 700 !important
						.old
							font-size 10px
							color $goodsFoodsTitle
							text-decoration line-through
							font-weight 700
					.cartcontrol-wrapper
						position absolute
						bottom 0
						right 0
</style>
