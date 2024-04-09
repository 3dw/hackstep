<template lang="pug">
q-page.index(padding="")
  .row
    .col-xs-6.col-sm-4.col-md-3.padded
      q-img(class="fluid" style="border-radius: 15px;" src="../assets/climb.png")
    .col-xs-6.col-sm-8.col-md-9.padded
      h6(v-for="(text, k) in parseMarkdownToSteps(intro).intros" :key="k") {{text}}
      div(v-for="(step, t) in parseMarkdownToSteps(intro).steps", :key="t")
        p(v-if="!step.r") {{step.n}}
        p(v-else)
          router-link(:to ="step.r", target="_blank", rel="noopener noreferrer") {{step.n}}
  .row
    q-btn(color = "primary", @click="goEdit", label="即刻嘗試編輯", icon="edit")
</template>

<script lang="ts">
import { parseMarkdownToSteps } from 'edu-lang';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const intro = ref(`
      Hackstep 是一個無邊界知識分享器。
      您可以

      1. 把您的知識排成步驟。
      2. 重新排序，
      3. 複製連結，分享出去。
      4. 接收校對與回覆，
      5. 收到的人可以針對每個步驟上網查詢。

      `);
    return {
      parseMarkdownToSteps,
      intro,
    };
  },
  methods: {
    goEdit() {
      this.$emit('goEdit');
    },
  },
});
</script>
