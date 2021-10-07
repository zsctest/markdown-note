<template>
  <div id="notebook">
      <Mainpane @notechange="noteContent" />
      <Preview :notehtml="notehtml" :mainScrollTop="mainScrollTop" />
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
      mainScrollTop: 0,
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
}
/* fallback */
@font-face {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/materialicons/v109/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2) format('woff2');
}

.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
}
.material-icons {
    font-size: 24px;
    line-height: 1;
    vertical-align: middle;
    margin: -3px;
    padding-bottom: 1px;
}
</style>
