<template>
  <aside class="preview" v-html="notePreview"></aside>
</template>

<script>
export default {
  name: "Preview",
  props: ["notehtml"],
  data() {
    return {
      content: this.notehtml,
    };
  },
  computed: {
    notePreview() {
      // console.log("preview接收到数据",this.content);
      return this.content;
    },
  },
  watch: {
    notehtml: function () {
      this.content = this.notehtml;
      function scrollToBottom() {
        const domWrapper = document.querySelector('.preview'); // 外层容器 出现滚动条的dom
        (function smoothscroll() {
            const currentScroll = domWrapper.scrollTop;   // 已经被卷掉的高度
            const clientHeight = domWrapper.offsetHeight; // 容器高度
            const scrollHeight = domWrapper.scrollHeight; // 内容总高度
            if (scrollHeight - 10 > currentScroll + clientHeight) {
                window.requestAnimationFrame(smoothscroll);
                domWrapper.scrollTo(0, currentScroll + (scrollHeight - currentScroll - clientHeight) / 2);
            }
        })();
      }
      scrollToBottom();
    },
  },
};
</script>

<style scoped>
.preview {
  background-color: #fff;
  width: 55%;
  height: 100vh;
  font-family: "Consolas", "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
    sans-serif;
  font-size: 1rem;
  line-height: 36px;
  padding: 20px 10px;

  overflow: auto;
}
</style>
<style>
.codeline {
  color: chocolate;
  font-family: "Consolas", "" monospace ",Gill Sans", "Gill Sans MT", Calibri,
    "Trebuchet MS", sans-serif;
  /* font-family: Consolas,Monaco,Andale Mono,Ubuntu Mono,monospace; */
  font-size: inherit;
  border-radius: 4px;
}
.codeblock {
  background-color: ivory;
  border-radius: 5px;
  padding: 0 8px;
  /* width:100%; */
}
h1 {
  font-size: 2em;
}
h2 {
  font-size: 1.9rem;
}
h3 {
  font-size: 1.8rem;
}
h4 {
  font-size: 1.7rem;
}
h5 {
  font-size: 1.6rem;
}
h6 {
  font-size: 1.5rem;
}
p {
  white-space: normal;
  word-wrap: break-word;
  word-break: break-all;
}
.annotation {
  color: lightslategray;
  border-left: mediumaquamarine 2px solid;
  padding-left: 16px;
}
</style>
