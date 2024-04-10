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
      q-btn(v-if="!isInApp", flat round icon="cloud_upload" @click="clickFileUpload()", aria-label="Upload", label="上傳")
      span.fat-only(v-if="!isInApp") MarkDown檔案
      input(type="file" accept=".md" @change="handleFileUpload" ref="fileInput" style="display: none;")
      q-btn(flat, round, icon="info", aria-lebel="Inro" , @click="goIntro()") 提示
      // 新增儲存按鈕
      // q-btn(flat, round, icon="save", aria-label="Save", @click="savePath", label="儲存")


  q-drawer(v-model="leftDrawerOpen", show-if-above, bordered)
    q-list
      q-item
        q-btn(:class="{active: isIn('intro')}", flat, dense, icon = "info", @click="goIntro") 說明
      q-item
        q-btn(:class="{active: isIn('edit')}", flat, dense, icon = "edit", @click="goEdit") 編輯
      q-item
        q-btn(:class="{active: isIn('search')}", flat, dense, icon = "link", @click="goSearch") 搜詢
      q-item(href="https://github.com/3dw/hackstep", target="_blank", rel="noopener noreferrer")
        q-btn(flat, dense, icon = "restaurant_menu") 原始碼
      q-item(to="/contact")
        q-btn(:class="{active: isIn('intro')}", flat, dense, icon = "people") 聯絡
      q-item
        | 小
        q-slider(v-model="font_size" :min="10" :max="30" label :label-value="font_size + 'px'" color="primary")
        span.big 大
      q-separator
      q-item.bold(v-if="savedPaths.length > 0")
        | 捷徑
      q-item(v-for="(path, index) in savedPaths" :key="index")
        q-btn(:style="{'font-size': font_size + 'px'}", flat color="green-10" icon="link", @click="navigateTo(path.path)") {{ path.name }}
        q-btn(:style="{'font-size': font_size + 'px'}", flat color="red-10" icon="delete" @click.stop="removeFromLeftDrawer(index)" aria-label="Remove" title="移除捷徑")

  q-page-container
    // 使用router-view顯示基於當前路由地址的子組件
    router-view(:font_size="font_size", @savePath = "savePath", @goEdit="goEdit")
</template>

<script lang="ts">
import { QSlider } from 'quasar';
import { saveAs } from 'file-saver';
import { defineComponent, ref, onMounted } from 'vue';
import InApp from 'detect-inapp';
import { useRouter } from 'vue-router';
const inapp = new InApp(
  navigator.userAgent || navigator.vendor || window.opera
);

export default defineComponent({
  name: 'MainLayout',
  components: {
    QSlider,
  },
  setup() {
    const router = useRouter();
    // 使用Vue 3 Composition API進行狀態管理
    const leftDrawerOpen = ref(false);
    const font_size = ref(16); // 預設值為16

    const isInApp = inapp.isInApp;

    console.log(localStorage.getItem('savedPaths'));

    var savedPaths;

    if (
      !localStorage.getItem('savedPaths') ||
      localStorage.getItem('savedPaths') === 'undefined'
    ) {
      savedPaths = ref([]);
    } else {
      savedPaths = ref(JSON.parse(localStorage.getItem('savedPaths') || '[]'));
    }

    const navigateTo = (path) => {
      // 使用vue-router的導航功能

      router.push(path);
      leftDrawerOpen.value = false;
    };

    // 當組件掛載後，可以進行一些初始化操作，例如從localStorage加載數據
    onMounted(() => {
      // 此處可以放置任何需要在組件掛載時執行的代碼
    });

    // 監聽localStorage中savedPaths的變化，這裡簡化了，實際應用中你可能需要更複雜的邏輯
    // 來監聽localStorage的變化，或者在更改localStorage時手動更新savedPaths
    window.addEventListener('storage', () => {
      savedPaths.value = JSON.parse(localStorage.getItem('savedPaths') || '[]');
    });

    return {
      savedPaths,
      navigateTo,
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
    removeFromLeftDrawer(index) {
      // 深拷貝savedPaths以避免直接修改原始數據
      console.log(this.savedPaths);
      const updatedPaths = [...this.savedPaths];

      if (window.confirm('確認要刪除該捷徑嗎?此動作不能復原')) {
        // 從拷貝的數組中移除指定的項目
        updatedPaths.splice(index, 1);

        // 重新賦值觸發更新
        this.savedPaths = updatedPaths;

        // 更新localStorage
        localStorage.setItem(
          'savedPaths',
          JSON.stringify(this.savedPaths.value)
        );

        // 提示用戶
        alert('已從側欄移除');
      }
    },
    savePath() {
      const fileName = window.prompt('請輸入檔名:');
      if (!fileName) return; // 如果使用者取消了輸入，就直接返回

      const path = this.$route.path; // 獲取當前路由的路徑
      const savedPaths = [...this.savedPaths];

      savedPaths.push({ name: fileName, path: path }); // 加入新的檔案名和路徑
      localStorage.setItem('savedPaths', JSON.stringify(savedPaths || [])); // 將更新後的陣列存回localStorage

      // 也更新組件的savedPaths狀態
      this.savedPaths = savedPaths;

      alert('路徑已儲存'); // 給予使用者反饋
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
      // 假設當前路由的path是this.$route.path
      const currentPath = this.$route.path;
      // 尋找savedPaths中是否有相同的path
      const savedPath = this.savedPaths.find((sp) => sp.path === currentPath);

      let title;
      if (savedPath) {
        // 如果找到，使用該項目的name作為檔案名
        title = savedPath.name;
      } else {
        // 如果沒找到，提示用戶輸入檔名
        title = window.prompt('請輸入檔名:');
        if (!title) return; // 如果用戶取消輸入，就直接返回
      }

      // 從這裡開始，代碼與之前相同...
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
          window.alert('已將當前超連結複製到剪貼簿: ' + copyText);
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
