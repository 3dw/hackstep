<template lang="pug">
// 使用Pug模板語言定義Vue組件的結構
q-layout(view="lHh Lpr lFf")
  q-header(elevated)
    q-toolbar
      // 定義二個按鈕：編輯步驟和複製連結
      // q-btn(flat, dense, round, icon="menu", aria-label="Menu", @click="toggleLeftDrawer")
      //q-btn(@click="editStep" flat round icon="edit" aria-label="Edit Step")
      q-btn(@click="copyLink" flat round icon="ios_share" aria-label="Copy Link" label="Copy Link")
  //q-drawer(v-model="leftDrawerOpen", show-if-above, bordered)
    q-list
      q-item-label(header) 設定
  q-page-container
    // 使用router-view顯示基於當前路由地址的子組件
    router-view()
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
// import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'MainLayout',
  setup() {
    // 使用Vue 3 Composition API進行狀態管理
    const leftDrawerOpen = ref(false);

    return {
      hash: ref(window.location.hash || ''),
      leftDrawerOpen,
      toggleLeftDrawer() {
        // 切換側邊抽屜的開合狀態
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  methods: {
    editStep() {
      // 檢查是否已經在編輯頁面，如果是，則顯示提示
      if (this.$route.name == 'EdiTor') {
        alert('You are already editing this step.');
        return;
      }
      this.$router.push(
        '/edit/_' + this.hash.replace('edit/', '').replace('_/', '')
      );
    },
    copyLink() {
      // 複製當前頁面的連結到剪貼簿
      if (!document.hasFocus()) {
        alert('Document does not have focus, cannot copy text.');
        return;
      }
      const copyText = 'https://hackstep.pages.dev' + this.$route.path;
      navigator.clipboard
        .writeText(copyText)
        .then(() => {
          window.alert('Copied the link: ' + copyText);
        })
        .catch((err) => {
          console.error('Could not copy text: ', err);
        });
    },
  },
});
</script>
