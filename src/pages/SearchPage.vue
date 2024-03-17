<template>
  <q-page class="flex flex-center">
    <q-stepper v-model="step" vertical color="primary">
      <q-step
        v-for="item in steps"
        :name="item.id.toString()"
        :key="item.id"
        :title="item.name"
        :caption="`Search ${item.name} on Google`"
        clickable
        @click="openInNewTab(item.name)"
      >
        <div class="q-pa-md" style="height: 100%; width: 100%;">
          <div style="text-decoration: underline; cursor: pointer;">
            Click here to search "{{ item.name }}" on Google
          </div>
        </div>
      </q-step>
    </q-stepper>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'StepsViewer',
  setup() {
    const step = ref(1);
    const steps = ref([
      { name: 'Step1', id: 1 },
      { name: 'Step2', id: 2 },
      { name: 'Step3', id: 3 },
    ]);

    const route = useRoute();

    onMounted(() => {
      if (route.params.steps) {
        const routeSteps = route.params.steps.split(/%20|\s/);
        steps.value = routeSteps.map((name, idx) => ({
          id: idx + 1,
          name: decodeURIComponent(name.replace(/_/g, ' ')),
        }));
      }
    });

    watch(() => route.params.steps, (newSteps) => {
      // 更新`steps`模型
      if (newSteps) {
        const routeSteps = newSteps.split(/%20|\s/);
        steps.value = routeSteps.map((name, idx) => ({
          id: idx,
          name,
          editing: false,
        }));
      }
    });

    const openInNewTab = (name) => {
      const url = `https://www.google.com/search?q=${encodeURIComponent(name)}`;
      window.open(url, '_blank');
    };

    return {
      step,
      steps,
      openInNewTab,
    };
  },
});
</script>
