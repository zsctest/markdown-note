<template>
    <Sidebar @select="selectedNote" ref="sidebar"></Sidebar>
	<section class="main">
		<div class="cover" v-show ="noSelectedNote">
			<div>选择笔记开始写作吧</div>
		</div>
		<div class="toolbar">
			<input />
			<button @click="this.$refs.sidebar.favoriteNote">收藏</button>
			<button @click="del">删除</button>
			<button @click="save">保存</button>
		</div>
		<textarea v-model="content"></textarea>
	</section>
</template>

<script>
import Sidebar from "./Sidebar.vue";
	export default{
		name:"Mainpane",
		components:{
			Sidebar,
		},
		data(){
			return {
				content:"",
				selectedId:null,
				noSelected:true,
			}
		},
		watch:{
			content:function(){
				// console.log("mainpane发送数据",this.content);
				//获取编辑区滚动条高度
				let mainScrollTop = document.querySelector("textarea").scrollTop || 0;
				let mainScrollHeight = document.querySelector("textarea").scrollHeight || 1;
				this.$emit("notechange",{
					"content":this.content,
					"height":mainScrollTop/mainScrollHeight
					});
			}
		},
		methods:{
			selectedNote(id){
				this.selectedId = id;
				this.content = this.$refs.sidebar.notes.find(note=> note.id === id).content;
				this.noSelected = false;
				console.log("in ")
			},
			save(){
				this.$refs.sidebar.notes.find(note=> note.id === this.selectedId).content = this.content;
			},
			del(){
				this.$refs.sidebar.removeNote();
				this.content = "";
				this.noSelected = true;
			}
		},
		computed:{
			noSelectedNote(){
				return this.noSelected;
			}
		}
	}
	
</script>

<style scoped>
	.main{
		position: relative;
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
	.cover{
		position: absolute;
		left:0;
		top:0;
		width:100%;
		height:100%;
		background-color:#ffffff;
		text-align: center;
	}
	.cover > div {
		margin-left: 100%;
		transform: translateY(30%);
		font-size: 4rem;
		opacity: 0.5;
		color: darkgray;
		writing-mode:vertical-lr;
	}
</style>
