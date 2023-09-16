<template lang="pug">
router-view
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App'
});
</script>

<style lang="scss">
.menu .item {
  justify-content: center;
}

.ui.menu {
  margin-top: 0 !important;
}

a, button, .clickable {
  cursor: pointer !important;
}

.ui.menu button.item {
  border: none;
}

</style>

