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
  q-btn(color="green" @click="addNewStep" class="q-ma-md fixed-bottom-right" icon="add" label="Add Step")
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { VueDraggableNext } from 'vue-draggable-next';

export default defineComponent({
  name: 'EdiTor',
  components: {
    draggable: VueDraggableNext,
  },
  setup() {
    const steps = ref([
      { name: 'Step1', id: 0, editing: false },
      { name: 'Step2', id: 1, editing: false },
      { name: 'Step3', id: 2, editing: false },
    ]);

    const route = useRoute();
    const router = useRouter();

    const editStep = (step) => {
      console.log('start edit!');
      step.editing = true;
    };

    const finishEdit = (step) => {
      console.log('end edit!');
      step.editing = false;
      // 可以在這裡添加對step.name的驗證或其他邏輯
    };

    const addNewStep = () => {
      const newId = steps.value.length
        ? Math.max(...steps.value.map((step) => step.id)) + 1
        : 0;
      steps.value.push({
        name:
          'step' +
          (steps.value.length
            ? Math.max(...steps.value.map((step) => step.id)) + 2
            : 1),
        id: newId,
        editing: false,
      });
    };

    const onChange = (list) => {
      console.log(list);
      const path =
        '/edit/' +
        steps.value
          .map((o) => {
            return o.name;
          })
          .join('%20');
      router.push(path);
    };

    onMounted(() => {
      if (route.params.steps) {
        const routeSteps = route.params.steps.split(/%20|\s/);
        steps.value = routeSteps.map((name, idx) => ({
          id: idx,
          name,
          editing: false,
        }));
      }
    });

    return { steps, editStep, finishEdit, addNewStep, onChange };
  },
});
</script>
