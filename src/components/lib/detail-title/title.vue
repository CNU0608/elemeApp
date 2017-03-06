<template>
	<div class="detail-title">
		<div class="line"></div>
		<h2 class="text">{{title}}</h2>
		<div class="line"></div>
	</div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
	.detail-title
		display flex
		width 80%
		margin 28px auto 24px auto
		.line
			position relative
			top -6px
			flex 1
			border-bottom 1px solid rgba(255,255,255, .2)
		.text
			padding 0 12px
			font-weight 700
			font-size 14px
</style>
