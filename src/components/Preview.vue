<template>
  <aside ref="preview" class="preview" v-html="notePreview"></aside>
</template>

<script>
export default {
  name: "Preview",
  props: ["notehtml","mainScrollTop"],
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
      let previewArea = document.querySelector(".preview");
      // let previewArea = this.$refs.preview;
      let previewScrollHeight = previewArea.scrollHeight - previewArea.clientHeight;
      console.log("rate receive",this.mainScrollTop);
      console.log("scrolltop",this.mainScrollTop*previewScrollHeight);
      window.requestAnimationFrame(()=>{
        previewArea.scrollTo(0,this.mainScrollTop*previewScrollHeight);
      })
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
