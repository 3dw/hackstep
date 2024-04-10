<template lang="pug">
q-page.row.items-center.justify-evenly
  draggable.dragArea.list-group.w-full(v-model="steps" @change="onChange")
    .item.flex.row.justify-between.align-center(v-for="(step, idx) in steps" :key="step.id", @click="toggleEdit(step)")
      template(v-if="step.editing")
        q-input.filled(:style="{'font-size': fontSizeRef + 'px'}", :autofocus="true", v-model="step.name" dense :ref="`input-${step.id}`" @blur="finishEdit(step)" @keyup.enter="finishEdit(step)")
      template(v-else)
        div(:style="{'font-size': fontSizeRef + 'px'}") {{ step.name }}
      .filler
      q-btn.small(color="primary",flat, dense, @click.stop="editStep(step)" icon="edit", title="編輯")
        span.invisible 編輯
      q-btn.small(color="secondary", flat, dense, @click.stop="openInNewTab(step.name)", title="搜詢", icon="search")
        span.invisible 搜詢
      q-btn.small(color="red", flat, dense, @click.stop="removeStep(step.id)" icon="delete", title="刪除")
        span.invisible 刪除
  .row(fixed-bottom-right)
    q-btn(:style="{'font-size': fontSizeRef + 'px'}", color="green-10" @click="addNewStep" class="q-ma-md" icon="add" label="增加步驟")
    q-btn(:style="{'font-size': fontSizeRef + 'px'}", color="primary" icon="save" label="儲存" @click="savePath")

    // q-btn(:style="{'font-size': fontSizeRef + 'px'}", color="red-10" @click="removeLastStep" class="q-ma-md" icon="delete" label="移除最後的步驟")
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, onMounted, watch, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { VueDraggableNext } from 'vue-draggable-next';
import { is } from 'quasar';

export default defineComponent({
  name: 'EdiTor',
  props: {
    font_size: {
      type: Number,
      default: 16,
    },
  },
  components: {
    draggable: VueDraggableNext,
  },
  setup(props, { emit }) {
    const { font_size: fontSizeRef } = toRefs(props);
    const steps = ref([
      { name: 'Step1', id: 0, editing: false },
      { name: 'Step2', id: 1, editing: false },
      { name: 'Step3', id: 2, editing: false },
    ]);

    const route = useRoute();
    const router = useRouter();

    const openInNewTab = (name) => {
      const url = `https://www.google.com/search?q=${encodeURIComponent(name)}`;
      window.open(url, '_blank');
    };

    const savePath = () => {
      emit('savePath'); // 發射自定義事件，名稱為 'save-steps'
    };

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

      // 定義正則表達式，檢查 "step" 後面是否跟著至少一個數字
      const regex = /step\d+/;

      // 使用 test() 方法檢查 step.name 是否符合正則表達式
      const isMatch = regex.test(step.name) || step.name === 'undefined';

      if (isMatch) {
        step.name = '';
      }

      // 確保DOM已更新
      nextTick(() => {
        // 使用動態ref聚焦到對應的輸入框
        const inputRef = `input-${step.id}`;
        const inputElement = ref(inputRef);
        if (inputElement.value && inputElement.value.$el) {
          inputElement.value.$el.focus();
        }
      });
    };

    const finishEdit = (step) => {
      console.log('end edit!');
      step.editing = false;

      onChange();
      // 可以在這裡添加對step.name的驗證或其他邏輯
    };

    const toggleEdit = (step) => {
      if (step.editing) {
        finishEdit(step);
      } else {
        editStep(step);
      }
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
      onChange();
    };

    const removeLastStep = () => {
      if (steps.value.length > 0) {
        steps.value.pop(); // 移除數組中的最後一個元素
        onChange();
      }
    };

    const removeStep = (id) => {
      const index = steps.value.findIndex((step) => step.id === id);
      if (index !== -1 && window.confirm('確認要刪除該步驟嗎?此動作不能復原')) {
        steps.value.splice(index, 1); // 根据索引移除元素
        onChange(); // 更新路由以反映更改
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

    watch(
      () => route.params.steps,
      (newSteps) => {
        // 更新`steps`模型
        if (newSteps) {
          const routeSteps = newSteps.split(/%20|\s/);
          steps.value = routeSteps.map((name, idx) => ({
            id: idx,
            name,
            editing: false,
          }));
        }
      }
    );

    return {
      fontSizeRef,
      steps,
      openInNewTab,
      editStep,
      finishEdit,
      toggleEdit,
      addNewStep,
      removeLastStep,
      removeStep,
      onChange,
      savePath,
    };
  },
});
</script>

<style scoped>
.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  left: -6vw;
  max-width: 88vw;
  overflow-wrap: break-word;
  overflow: auto;
  white-space: normal;
}

/* 確保 .item 內的按鈕顯示正確 */
.item .q-btn {
  display: inline-flex; /* Quasar的按鈕默認使用inline-flex，這行確保按鈕保持預設顯示方式 */
  margin-left: 8px; /* 按需添加間隔 */
}

.filler {
  display: inline-flex;
  flex-grow: 1;
}
</style>
