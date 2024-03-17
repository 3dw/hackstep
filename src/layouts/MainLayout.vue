<template lang="pug">
// 使用Pug模板語言定義Vue組件的結構
q-layout(view="lHh Lpr lFf")
  q-header(elevated)
    q-toolbar
      q-btn(flat, dense, round, icon="menu", aria-label="Menu", @click="toggleLeftDrawer")
      q-btn(@click="copyLink" flat round icon="ios_share" aria-label="Share" label="Share")
      q-btn(@click="downloadSteps" flat round icon="cloud_download" aria-label="Download")
      q-btn(flat round icon="cloud_upload" @click="clickFileUpload()")
      input(type="file" accept=".md" @change="handleFileUpload" ref="fileInput" style="display: none;")


  q-drawer(v-model="leftDrawerOpen", show-if-above, bordered)
    q-list
      q-item 
        q-btn(:class="{active: isIn('intro')}", flat, dense, icon = "info", @click="goIntro") 說明
      q-item
        q-btn(:class="{active: isIn('edit')}", flat, dense, icon = "edit", @click="goEdit") 編輯
      q-item
        q-btn(:class="{active: isIn('search')}", flat, dense, icon = "link", @click="goSearch") 聯想
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
    isIn(path) {
      console.log(this.$route.path.indexOf(path) > -1)
      return this.$route.path.indexOf(path) > -1
    },
    goIntro() {
      this.$router.push(
        '/intro/' + this.$route.params.steps
      )
    },
    goEdit() {
      this.$router.push(
        '/edit/' + this.$route.params.steps
      );     
    },
    goSearch() {
      this.$router.push(
        '/search/' + this.$route.params.steps
      );     
    },
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
    downloadSteps() {
      const title = window.prompt('Please Enter a Title:');
      const steps = this.$route.params.steps.split(/%20|\s/)
      let markdownContent = steps.map((step, index) => `${index + 1}. ${step}`).join('\n');
      // 添加文件開頭，如有需要
      markdownContent = '# ' + title + '\n\n' + markdownContent;
      
      const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = title + '.md';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    clickFileUpload() {
      this.$refs.fileInput.click(); // 觸發檔案選擇
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target.result;
          const steps = this.parseMarkdown(content);
          const stepsJoined = steps.join(' ');
          this.$router.push({ path: `/edit/${encodeURIComponent(stepsJoined)}` });
          // bug here..... ///

        };
        reader.readAsText(file);
      }
    },
    parseMarkdown(content) {
      const lines = content.split('\n');
      const steps = lines.filter(line => line.match(/^\d+\.\s+/)).map(line => line.replace(/^\d+\.\s+/, ''));
      return steps; // 返回解析後的步驟列表
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

<style scoped>

.active {
  border-left: 3px solid #ccc;
}

</style>
