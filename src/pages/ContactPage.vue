<template lang="pug">
q-page(padding)
  h6 聯絡
  ul
    li(:style="{fontSize: font_size + 'px'}")
      | 設計與維護：
      a(href="https://www.alearn.org.tw", target="_blank", rel="noopener noreferrer") 社團人法中華民國自主學習促進會
    li(:style="{fontSize: font_size + 'px'}")
      | 錯誤回報與功能請求
      a(href="https://github.com/3dw/hackstep/issues", target="_blank", rel="noopener noreferrer") 請按此議題區

</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'ContactPage',
  props: {
    font_size: {
      type: Number,
      default: 16,
    },
  },
});
</script>
