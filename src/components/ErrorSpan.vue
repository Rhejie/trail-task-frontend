<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
    message: {
        type: String,
        default: 'This is required'
    }
})

const message = computed(() => props.message)
</script>
<template>
    <span class="text-xs text-red-600">{{ message }}</span>
</template>