<template lang="pug">
// 使用Pug模板語言定義Vue組件的結構
q-layout(view="lHh Lpr lFf")
  q-header(elevated)
    q-toolbar
      q-btn(flat, dense, round, icon="menu", aria-label="Menu", @click="toggleLeftDrawer")
      q-btn(@click="copyLink" flat round icon="ios_share" aria-label="Share" label="分享")
      span.fat-only 當前網址
      q-btn(v-if="!isInApp", @click="downloadSteps" flat round icon="cloud_download" aria-label="Download", label="下載")
      span.fat-only(v-if="!isInApp") MarkDown檔案
      // q-btn(v-else, label="在瀏覽器中打開", flat round @click="openInExternalBrowser")
      q-btn(v-if="!isInApp", flat round icon="cloud_upload" @click="clickFileUpload()", aria-label="Upload", label="上傳")
      span.fat-only(v-if="!isInApp") MarkDown檔案
      input(type="file" accept=".md" @change="handleFileUpload" ref="fileInput" style="display: none;")


  q-drawer(v-model="leftDrawerOpen", show-if-above, bordered)
    q-list
      q-item
        q-btn(:class="{active: isIn('intro')}", flat, dense, icon = "info", @click="goIntro") 說明
      q-item
        q-btn(:class="{active: isIn('edit')}", flat, dense, icon = "edit", @click="goEdit") 編輯
      q-item
        q-btn(:class="{active: isIn('search')}", flat, dense, icon = "link", @click="goSearch") 搜詢
      q-item
        | 小
        q-slider(v-model="font_size" :min="10" :max="30" label :label-value="font_size + 'px'" color="primary")
        span.big 大
  q-page-container
    // 使用router-view顯示基於當前路由地址的子組件
    router-view(:font_size="font_size")
</template>

<script lang="ts">
import { QSlider } from 'quasar';
import { saveAs } from 'file-saver';
import { defineComponent, ref } from 'vue';
import InApp from 'detect-inapp';
// import { useRoute } from 'vue-router';
const inapp = new InApp(
  navigator.userAgent || navigator.vendor || window.opera
);

export default defineComponent({
  name: 'MainLayout',
  components: {
    QSlider,
  },
  setup() {
    // 使用Vue 3 Composition API進行狀態管理
    const leftDrawerOpen = ref(false);
    const font_size = ref(16); // 預設值為16

    const isInApp = inapp.isInApp;

    return {
      hash: ref(window.location.hash || ''),
      font_size,
      isInApp,
      leftDrawerOpen,
      toggleLeftDrawer() {
        // 切換側邊抽屜的開合狀態
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  methods: {
    openInExternalBrowser() {
      // 獲取當前頁面的URL
      const url = window.location.href;

      // 嘗試在新的瀏覽器窗口中打開當前頁面
      window.open(url, '_blank').focus();
    },
    isIn(path) {
      // console.log(this.$route.path.indexOf(path) > -1);
      return this.$route.path.indexOf(path) > -1;
    },
    goIntro() {
      this.$router.push('/intro/' + this.$route.params.steps);
    },
    goEdit() {
      this.$router.push('/edit/' + this.$route.params.steps);
    },
    goSearch() {
      this.$router.push('/search/' + this.$route.params.steps);
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
      if (!title) return; // 用户取消输入时退出函数

      const steps = this.$route.params.steps.split(/%20|\s/);
      let markdownContent = steps
        .map((step, index) => `${index + 1}. ${step}`)
        .join('\n');
      markdownContent = '# ' + title + '\n\n' + markdownContent;

      const blob = new Blob([markdownContent], {
        type: 'text/markdown;charset=utf-8',
      });
      saveAs(blob, title + '.md');
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
          this.$router.push({
            path: `/edit/${encodeURIComponent(stepsJoined)}`,
          });
        };
        reader.onerror = (error) => {
          console.error('File reading error:', error);
          alert('An error occurred while reading the file.');
        };
        reader.readAsText(file);
      }
    },
    parseMarkdown(content) {
      const lines = content.split('\n');
      const steps = lines
        .filter((line) => line.match(/^\d+\.\s+/))
        .map((line) => line.replace(/^\d+\.\s+/, ''));
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
.big {
  font-size: 30px;
  position: relative;
  top: -0.5em;
}
</style>
