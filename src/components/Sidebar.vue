<template>
  <aside class="side-bar">
    <div class="toolbar">
      <button @click="addNote" :title="notes.length + ' note(s) already'">
        增加笔记
      </button>
    </div>
    <div class="notes">
      <div
        class="note"
        v-for="note of sortedNotes"
        :class="{ selected: note ===  selectedNote}"
        @click="selectNote(note)"
        :key="note.id"
      >
        <i class="icon material-icons" v-if="note.favorite">star</i
        >{{ note.title }}
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: "Sidebar",
data () {
    return {
      notes: JSON.parse(localStorage.getItem('notes')) || [],
      selectedId: localStorage.getItem('selected-id') || null,
      isSelected:false,
    }
  },


  computed: {
    selectedNote () {
      return this.notes.find(note => note.id === this.selectedId)
    },


    sortedNotes () {
      return this.notes.slice().sort((a, b) => a.created - b.created)
      .sort((a, b) => (a.favorite === b.favorite)? 0 : a.favorite? -1 : 1)
    },

  },


  watch: {
    notes: {
      handler: 'saveNotes',
      deep: true,
    },
    selectedId (val, oldVal) {
      localStorage.setItem('selected-id', val);
      console.log("old",oldVal);
    },
  },

  methods:{
    addNote () {
      const time = Date.now()
      const note = {
          id: String(time),
          title: "New Note" + (this.notes.length + 1),
          content: "Type to Enjoy the Markdown!",
          created: time,
          favorite: false,
      };
      // Add
      this.notes.push(note)
      // Select
      this.selectNote(note)
    },

    // Remove
    removeNote () {
      if (this.selectedNote && confirm('Delete the note?')) {
        const index = this.notes.indexOf(this.selectedNote)
        if (index !== -1) {
          this.notes.splice(index, 1)
        }
      }
      this.isSelected = false;
    },

    selectNote (note) {
      this.selectedId = note.id;
      this.$emit("select",this.selectedId);
    },

    saveNotes () {
      localStorage.setItem('notes', JSON.stringify(this.notes))
      console.log('Notes saved!', new Date())
    },

    favoriteNote () {
      this.selectedNote.favorite ^= true
    },
    getSelected(){
      return this.isSelected;
    }
  },
  updated(){
    console.log("updated",this.selectedId);
    // this.$emit("select",this.selectedId);
  }

};
</script>

<style scoped>
.side-bar {
  background-color: #42b983;
  width: 300px;
  height: 100vh;
}
.toolbar {
  padding: 4px;
}
.note {
  padding: 16px;
  cursor: pointer;
}

.note:hover {
  background: #ade2ca;
}

.note .icon {
  float: right;
}
.note.selected {
  background: #40b883;
  color: white;
}
</style>
