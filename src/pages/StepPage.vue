<template lang = "pug">
q-page.row.items-center.justify-evenly
  draggable(class="dragArea list-group w-full",
        :list="steps || []", @change="onChange")
    .item(v-for="(s, idx) in steps", :key="idx") {{ s.name }}


</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';

export default defineComponent({
  name: 'EdiTor',
  components: {
    draggable: VueDraggableNext
  },
  setup () {
    var steps = ref([
      { name: "John", id: 0 },
      { name: "Joao", id: 1 },
      { name: "Jean", id: 2 }
    ])
    const dragging = ref(false)
    return { steps, dragging };
  },
  mounted () {
    this.dragging = false;
    console.log(this.$route.params.steps.split(/%20|\s/))
    if (this.$route.params.steps.split(/%20|\s/) && this.$route.params.steps.split(/%20|\s/).length > 1) {
      this.steps = this.$route.params.steps.split(/%20|\s/).map((s, idx) => ({ name: s, id: idx }));
    }
  },  
  methods: {
    onChange(e) {
      console.log(e)
      /* var ss = [...this.steps];
      const oldIndex = e.moved.oldIndex; console.log(oldIndex)
      const newIndex = e.moved.newIndex; console.log(newIndex)

      ss[oldIndex] = {...this.steps[newIndex]};
      ss[newIndex] = {...this.steps[oldIndex]};

      this.steps = [...ss];  */

      console.log(this.steps)
      this.dragging = false;
      // this.$emit('update_steps', this.steps);
    }
  }
});
</script>
