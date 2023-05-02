<template>
  <div class="min-h-full">
    
    <TheNavigation/>
    <TheHeader/>
    <main>
      <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script setup>
import TheHeader from './components/TheHeader.vue';
import TheNavigation from './components/TheNavigation.vue';
</script>