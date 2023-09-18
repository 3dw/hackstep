<template lang="pug">
q-layout(view="lHh Lpr lFf")
  q-header(elevated)
    q-toolbar
      q-btn(flat, dense, round, icon="menu", aria-label="Menu", @click="toggleLeftDrawer")
      q-btn(@click="editStep" flat round icon="edit" aria-label="Edit Step")
      q-btn(@click="copyLink" flat round icon="link" aria-label="Copy Link")
  q-drawer(v-model="leftDrawerOpen", show-if-above, bordered)
    q-list
      q-item-label(header) 設定
  q-page-container
    router-view(@update_steps="update_steps")

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'MainLayout',
  components: {
  },
  setup () {
    const leftDrawerOpen = ref(false)

    return {
      hash: ref(window.location.hash || ''),
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },
  methods: {
    update_steps (steps: any) {
      this.$router.push('/edit/' + steps.map((s: any) => s.name).join(' '));
    },
    editStep () {
      if (this.$route.name == 'EdiTor') {
        alert('You are already editing this step.')
        return;
      }
      this.$router.push('/edit/' + this.hash.replace('edit/', '').replace('#/', ''));
    },
    copyLink () {
      if (!document.hasFocus()) {
        alert('Document does not have focus, cannot copy text.');
        return;
      }
      console.log(this.hash);
      const copyText = 'https://bestian.github.io/hackstep/' + this.hash;
      navigator.clipboard.writeText(copyText)
        .then(() => {
          window.alert('Copied the text: ' + copyText);
        })
        .catch(err => {
          console.error('Could not copy text: ', err);
        });
      this.$forceUpdate();
    }
  }
});
</script>
