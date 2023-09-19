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
    setup () {
      const intro = ref(`
      Hackstep 是一個無邊界知識分享器。
      您可以把您的知識排成步驟或者小階梯：
  
      1.先確定你有意願分享您的知識
      2.請參考[使用說明](!intro)
      3.請從[範例開始](!edit/標題%201.第一步)
      4.開始分享吧！
  
      `);
      return {
        parseMarkdownToSteps,
        intro,
      };
    }
  });
  </script>
  