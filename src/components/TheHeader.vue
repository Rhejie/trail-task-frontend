<script setup>
import { watch, ref } from 'vue';
import { useRoute } from 'vue-router'
const route = useRoute();
const title = ref('')

watch(route, () => {
    if(route.meta.header) {
        title.value = route.meta.header
    }
})
</script>
<template>
    <header class="bg-white shadow">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">{{ title }}</h1>
      </div>
    </header>
</template>