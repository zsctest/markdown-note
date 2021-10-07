<template>
  <div id="notebook">
    <template v-if="true">
      <Mainpane @notechange="noteContent" />
      <Preview :notehtml="notehtml" :mainScrollTop="mainScrollTop" />
    </template>
    <div v-else class="notesEmpty">
      <div>添加笔记开始写作吧！</div>
    </div>
  </div>
</template>

<script>
import Preview from "./components/Preview.vue";
import Mainpane from "./components/Mainpane.vue";
import markdown from "./markdown.js";
export default {
  name: "App",
  components: {
    Preview,
    Mainpane,
  },
  data() {
    return {
      notehtml: "",
      mainScrollTop: 1,
    };
  },

  methods: {
    noteContent(data) {
      //接收到编辑区组件发来的解析成HTML后的笔记内容

      //传给预览区组件
      this.notehtml = markdown(data.content);
      this.mainScrollTop = data.height;
    },
  },
};
</script>

<style>
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#notebook {
  display: flex;
  /* justify-content: space-around; */
}
.notesEmpty {
  width: 100%;
  height: 100vh;
  text-align: center;
}
.notesEmpty > div {
  padding-top: 50%;
  transform: translateY(-50%);
  font-size: 4rem;
  opacity: 0.5;
  color: darkgray;
}
</style>
