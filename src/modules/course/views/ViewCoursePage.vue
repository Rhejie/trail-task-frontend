<script setup>
import { computed, defineProps, onMounted } from 'vue';
import { fetchCoure } from '../composable/get-courses';
import CourseCard from '../components/CourseCard.vue';
import StudentList from '../../student/components/StudentList.vue';
const props = defineProps({
    id: null
})

const courseId = computed(() => props.id);

const { load: loadCourse, loading, data: course } = fetchCoure();

onMounted(async () => {
    await loadCourse(courseId.value);
})
</script>
<template>
    <div class="w-full p-2">
        <div class="grid lg:grid-cols-5 gap-4">
            <div class="md:col-span-2 md:border-r border-gray-200">
                <CourseCard :course="course" :loading="loading"/>
            </div>
            <div class="md:col-span-3">
                <StudentList :course-id="+courseId"/>
            </div>  
        </div>
    </div>
</template>