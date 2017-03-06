<template>
    <div class="header">
        <div class="content-wrapper">
        	<div class="avatar">
        		<img width="64" height="64" :src="seller.avatar" :alt="seller.description">
        	</div>
        	<div class="content">
        		<div class="title">
        			<span class="brand"></span>
        			<span class="name">{{seller.name}}</span>
        		</div>
        		<div class="description">
        			<p>{{seller.description}} / {{seller.deliveryTime}}分钟送到</p>
        		</div>
        		<div class="supports" v-if="seller.supports">
        			<class-map :index="seller.supports[0].type" :type="1"></class-map>
        			<span class="support-text">{{seller.supports[0].description}}</span>
        		</div>
        	</div>
        	<div v-if="seller.supports" class="support-count" @click="showDetail">
		    	<span class="count">{{seller.supports.length}}个</span>
		    	<i class="icon-keyboard_arrow_right"></i>
		    </div>
        </div>
        <div class="bulletin-wrapper" @click="showDetail">
        	<span class="bulletin-title"></span><span class="bulletion-text">{{seller.bulletin}}</span>
        	<i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="background">
        	<img width="100%" height="100%" :src="seller.avatar">
        </div>
        <!-- 弹窗层 -->
        <div class="detail" v-show="detailShow">
        	<div class="detail-wrapper clearfix">
        		<div class="detail-main">
        			<h1 class="name">{{seller.name}}</h1>
        			<div class="star-wrapper">
        				<v-star :size="48" :score="seller.score"></v-star>
        			</div>
        			<v-title title="优惠信息"></v-title>
        			<ul v-if="seller.supports" class="supports">
        				<li class="supports-item" v-for="item in seller.supports">
        					<class-map :index="item.type" :type="2"></class-map>
        					<span class="support-text">{{item.description}}</span>
        				</li>
        			</ul>
        			<v-title title="商家公告"></v-title>
        			<div class="bulletin">
        				<p class="content">{{seller.bulletin}}</p>
        			</div>
        		</div>
        	</div>
        	<div class="detail-close" @click="hideDetail">
        		<i class="icon-close"></i>
        	</div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
  import classMap from 'components/lib/classMap/classMap'
  import star from 'components/star/star'
  import title from 'components/lib/detail-title/title'
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        detailShow: false
      }
    },
    methods: {
      showDetail() {
        this.detailShow = true
      },
      hideDetail() {
        this.detailShow = false
      }
    },
    created() {
      this.classMap = ['decrease_1', 'discount_1', 'special_3', 'invoice_1', 'guarantee_1']
    },
    components: {
      'v-star': star,
      'v-title': title,
      classMap
    }
  }
</script>
<style lang="stylus", rel="stylesheet/stylus">
	@import '../../common/stylus/mixin.styl'
	.header
		position relative
		overflow hidden
		background-color rgba(7,17,27,.5)
		color #fff
		.content-wrapper
			position relative
			font-size 0
			padding 19px 12px 18px 19px
			.avatar
				display inline-block
				vertical-align top
				img
					border-radius 2px
			.content
				display inline-block
				margin-left 16px
				.title
					margin-bottom 8px
					.brand
						display inline-block
						vertical-align top
						width 30px
						height 18px
						background-size 30px 18px
						bg-image('brand')
						background-position center center
						background-repeat no-repeat
					.name
						line-height 18px
						font-size 16px
						font-weight bold
						margin-left 6px	
				.description
					line-height 12px
					font-size 12px
					font-weight 200
					margin-bottom 10px
				.supports
					.support-text
						line-height 12px
						font-size 10px
						font-weight 200
			.support-count
				position absolute
				padding 7px 8px
				background-color rgba(0,0,0,.2)
				border-radius 16px
				right 12px
				bottom 14px
				.count
					line-height 12px
					vertical-align middle
					font-size 10px
				i
					font-size 14px
					vertical-align middle
					margin-left 2px
		.bulletin-wrapper
			position relative
			height 28px
			line-height 28px
			white-space nowrap
			text-overflow ellipsis
			overflow hidden
			padding 0 22px 0 12px
			background-color rgba(7,17,27,.2)
			.bulletin-title
				display inline-block
				width 22px
				height 12px
				vertical-align middle
				bg-image('bulletin')
				background-size 22px 12px
				background-repeat no-repeat
			.bulletion-text
				font-size 10px
				font-weight 200
				vertical-align middle
				margin-left 4px
			i
				position absolute
				right 12px
				top 7px
		.background
			z-index -1
			position absolute
			width 100%
			top 0
			left 0
			filter blur(10px)		
		.detail
			z-index 100
			position fixed
			top 0
			left 0
			width 100%
			height 100%
			background-color rgba(7,17,27,.8)
			overflow auto
			.detail-wrapper
				width 100%
				min-height 100%
				.detail-main
					margin-top 64px
					padding-bottom 64px
					.name
						line-height 16px
						font-size 16px
						font-weight 700
						text-align center
					.star-wrapper
						margin-top 18px
						padding 2px 0
						text-align center
					.supports
						width 80%
						margin 0 auto
						.supports-item
							padding 0 12px
							margin-bottom 12px
							font-size 0
							&:last-child
								margin-bottom 0
							.support-text
								line-height 16px
								font-size 12px
					.bulletin
						width 80%
						margin 0 auto
						.content
							padding 0 12px
							line-height 24px
							font-size 12px
			.detail-close
				position relative
				left 0
				bottom 0
				width 32px
				height 32px
				font-size 32px
				margin -64px auto 0 auto	
		
			
</style>
