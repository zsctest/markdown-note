<template>
	<section class="main">
		<div class="toolbar">
			<input />
			<button>收藏</button>
			<button>删除</button>
		</div>
		<textarea v-model="content"></textarea>
	</section>
</template>

<script>
	export default{
		name:"Mainpane",
		data(){
			return {
				content:"",
			}
		},
		watch:{
			content:function(){
				// console.log("mainpane发送数据",this.content);
				//获取编辑区滚动条高度
				let mainScrollTop = document.querySelector("textarea").scrollTop;
				this.$emit("notechange",{"content":this.content,"height":mainScrollTop});
			}
		}
	}
	
</script>

<style scoped>
	.main{
		background-color: #2C3E50;
		width:45%;
		height:100vh;
		display: flex;
		flex-direction: column;
		padding:4px;
	}
	textarea{
		resize: none;
		border: none;
		box-sizing: border-box;
		margin:4px;
		padding:8px;
		font-family: monospace;
		outline:none !important;
		overflow-y: scroll;
		flex: auto 1 1;
		font-size: 1rem;
		line-height: 1.4;
	}
</style>
