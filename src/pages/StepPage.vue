<template lang="pug">
q-page.row.items-center.justify-evenly
  draggable.dragArea.list-group.w-full(v-model="steps" @change="onChange")
    .item.flex.row.justify-between.align-center(v-for="(step, idx) in steps" :key="step.id")
      template(v-if="step.editing")
        q-input.filled(:autofocus="true", v-model="step.name" dense :ref="`input-${step.id}`" @blur="finishEdit(step)" @keyup.enter="finishEdit(step)")
      template(v-else)
        div {{ step.name }}
      q-btn.small(flat, dense, @click="editStep(step)" icon="edit" class="q-ml-md")
      q-btn.small(color="red", flat, dense, @click="removeStep(step.id)" icon="delete" class="q-ml-md")
  .row(fixed-bottom-right)
    q-btn(color="green" @click="addNewStep" class="q-ma-md" icon="add" label="Add Step")
    q-btn(color="red" @click="removeLastStep" class="q-ma-md" icon="delete" label="Remove Last Step")
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, nextTick } from 'vue';
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


    const onChange = () => {
      const path =
        '/edit/' +
        steps.value
          .map((o) => {
            return encodeURIComponent(o.name.replace(/\s/g, '_'));
          })
          .join('%20');
      router.push(path);
    };

    const editStep = (step) => {
      console.log('start edit!');
      step.editing = true;
      // 確保DOM已更新
      nextTick(() => {
        // 使用動態ref聚焦到對應的輸入框
        const inputRef = `input-${step.id}`;
        const inputElement = refs[inputRef];
        if (inputElement && inputElement.$el) {
          inputElement.$el.focus();
        }
      });
    };

    const finishEdit = (step) => {
      console.log('end edit!');
      step.editing = false;

      onChange()
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

    const removeLastStep = () => {
      if (steps.value.length > 0) {
        steps.value.pop(); // 移除數組中的最後一個元素
        onChange()
      }
    };

    const removeStep = (id) => {
      const index = steps.value.findIndex(step => step.id === id);
      if (index !== -1) {
        steps.value.splice(index, 1);  // 根据索引移除元素
        onChange();  // 更新路由以反映更改
      }
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

    return {
      steps,
      editStep,
      finishEdit,
      addNewStep,
      removeLastStep,
      removeStep,
      onChange,
    };
  },
});
</script>
