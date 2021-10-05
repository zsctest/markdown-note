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
  font-size: 1.2rem;
  line-height: 1.4;
  padding: 8px;
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
  padding:0 8px;
  /* width:100%; */
}
h1 {
  font-size: 2em;
}
p {
  white-space:normal;
  word-wrap:break-word;
  word-break:break-all;
}
.annotation{
	color:lightslategray;
	border-left:mediumaquamarine 2px solid;
	padding-left:16px;
}

</style>
