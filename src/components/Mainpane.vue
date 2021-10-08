<template>
  <Sidebar @select="selectedNote" ref="sidebar"></Sidebar>
  <section class="main">
    <div class="cover" v-show="noSelectedNote">
      <div>选择笔记开始写作吧</div>
    </div>
    <div class="toolbar">
      <input type="text" v-model="title" />
      <button @click="star">标记</button>
      <button @click="del">删除</button>
      <button @click="save">保存</button>
    </div>
    <textarea v-model="content"></textarea>
  </section>
</template>

<script>
import Sidebar from "./Sidebar.vue";
export default {
  name: "Mainpane",
  components: {
    Sidebar,
  },
  data() {
    return {
      content: "",
      selectedId: null,
      noSelected: true,
      title: "title",
    };
  },
  watch: {
    content: function () {
      //获取编辑区滚动条高度
      let textarea = document.querySelector("textarea");
      let mainScrollTop = textarea.scrollTop;
      let mainScrollHeight =
        document.querySelector("textarea").scrollHeight - 
          textarea.offsetHeight-38;
      //38 = fontsize * lineHeight + paddingtop + paddingbottom
      // console.log("rate",mainScrollTop / mainScrollHeight);
      this.$emit("notechange", {
        content: this.noSelectedNote?"":this.content,
        height: mainScrollTop / mainScrollHeight,
      });
    },
  },
  methods: {
    selectedNote(id) {
      this.selectedId = id;
      let note = this.$refs.sidebar.notes.find((note) => note.id === id);
      this.content = note.content;
      this.noSelected = false;
      this.title = note.title;
    },
    save() {
      let note = this.$refs.sidebar.notes.find(
        (note) => note.id === this.selectedId
      );
      note.content = this.content;
      note.title = this.newTitle;
    },
    del() {
      this.$refs.sidebar.removeNote();
      this.content = "";
      this.noSelected = true;
    },
    star(){
      this.$refs.sidebar.favoriteNote();
    }
  },
  computed: {
    noSelectedNote() {
      return this.noSelected;
    },
    newTitle() {
      return this.title;
    },
  },
};
</script>

<style scoped>
.main {
  position: relative;
  background-color: #2c3e50;
  width: 50%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 4px;
}
textarea {
  resize: none;
  border: none;
  box-sizing: border-box;
  margin: 4px;
  padding: 8px;
  font-family: monospace;
  outline: none !important;
  overflow-y: scroll;
  flex: auto 1 1;
  font-size: 1rem;
  line-height: 1.4;
}
.toolbar{
	margin: 4px;
}
.cover {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  text-align: center;
}
.cover > div {
  margin-left: 100%;
  transform: translateY(30%);
  font-size: 4rem;
  opacity: 0.5;
  color: darkgray;
  writing-mode: vertical-lr;
}


input {
  border: solid 2px #ade2ca;
  border-radius: 3px;
  padding: 6px 10px;
  background: #f0f9f5;
  color: #666;
  outline: none !important;
}

input:focus {
  border-color: #40b883;
  background: white;
  color: black;
}
button,
input {
  height: 34px;
}
</style>
<style>
button,
.note.selected {
  background: #40b883;
  color: white;
}

button {
  border-radius: 3px;
  border: none;
  display: inline-block;
  padding: 8px 12px;
  cursor: pointer;
  margin:2px;
}

button:hover {
  background: #63c89b;
}
</style>