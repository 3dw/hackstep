<template lang="pug">
q-page.index(padding="")
  .row
    h2 關於Hackstep
  .row
    .col-xs-6.col-sm-4.col-md-3.padded
      q-img(class="fluid" style="border-radius: 15px;" src="../assets/climb.png")
    .col-xs-6.col-sm-8.col-md-9.padded
      h6(v-for="(text, k) in parseMarkdownToSteps(intro).intros" :key="k") {{text}}
      div(v-for="(step, t) in parseMarkdownToSteps(intro).steps", :key="t")
        p(v-if="!step.r") {{step.n}}
        p(v-else)
          router-link(:to ="step.r", target="_blank", rel="noopener noreferrer") {{step.n}}
</template>

<script lang="ts">
import { parseMarkdownToSteps } from 'edu-lang';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const intro = ref(`
    Hackstep 是一個無邊界知識分享器。
    您可以把您的知識排成步驟或者小階梯：`);
    return {
      parseMarkdownToSteps,
      intro,
    };
  },
  mounted() {
    // 使用編碼後的URL來處理空格等字符
    const path = '/edit/step1%20step2%20step3';
    this.$router.push(path);
  },
});
</script>
