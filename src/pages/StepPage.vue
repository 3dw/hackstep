<template lang="pug">
q-page.row.items-center.justify-evenly
  draggable.dragArea.list-group.w-full(v-model="steps" @change="onChange")
    .item(v-for="(step, idx) in steps" :key="step.id")
      // 判斷是否處於編輯狀態，顯示輸入框或者文本
      template(v-if="step.editing")
        q-input.filled(v-model="step.name" dense @blur="finishEdit(step)" @keyup.enter="finishEdit(step)")
      template(v-else)
        | {{ step.name }}
        q-btn.icon.small(@click="editStep(step)" icon="edit")

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import { VueDraggableNext } from 'vue-draggable-next';

export default defineComponent({
  name: 'EdiTor',
  components: {
    draggable: VueDraggableNext,
  },
  setup() {
    const steps = ref(
      [
        { name: 'John', id: 0, editing: false },
        { name: 'Joao', id: 1, editing: false },
        { name: 'Jean', id: 2, editing: false }
      ]
    );

    const route = useRoute();

    const editStep = (step) => {
      console.log('start edit!')
      step.editing = true;
    };

    const finishEdit = (step) => {
      console.log('end edit!')
      step.editing = false;
      // 可以在這裡添加對step.name的驗證或其他邏輯
    };

    return { steps, editStep, finishEdit };
  },
});
</script>


