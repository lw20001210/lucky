<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
  @import '@/static/iconfont/font/iconfont.css';
  @import '@/static/css/touch.css';
  /* 这个高度我们得手动去掉，否则纵向滚动做不了，它会撑开盒子高度导致两个滚动条 */
  :deep(.uni-app--showtabbar uni-page-wrapper::after)
  {
    display: none !important;
    height: 0 !important;
  }
  /* 隐藏滚动条 */
  ::-webkit-scrollbar {
      display: none;
      width: 0 !important;
      height: 0 !important;
      -webkit-appearance: none;
      background: transparent;
      color: transparent;
    }
    
</style>
