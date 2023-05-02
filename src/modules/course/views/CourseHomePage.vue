<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { fetCourses } from '../composable/get-courses';
import CourseList from '../components/CourseList.vue'
import { PlusCircleIcon } from '@heroicons/vue/24/outline';
import GlobalModal from '../../../components/popup/GlobalModal.vue';
import CourseFrom from '../components/CourseForm.vue'
import GlobalNotification from '../../../components/popup/GlobalNotification.vue';
import { debounce as _debounce } from 'lodash'

const { load: loadCourses, data: courses, loading: loadingCourses } = fetCourses();

const search = ref('')

const params = computed(() => {
    return {
        search: search.value,
        page: 1,
        limit: 10,
    }
})
const showNotification = ref(false)

const openCreateCoursModal = ref(false)

const handleClickAddCourse = () => {
    openCreateCoursModal.value = true
}

const handleCloseModal = () => {
    openCreateCoursModal.value = false
    showNotification.value = false
}

const handleAcceptNewCreatedCourse = (newlyCreatedCourse) => {
    courses.value.unshift(newlyCreatedCourse)
    openCreateCoursModal.value = false;
    showNotification.value = true
    console.log(newlyCreatedCourse)
}

const onChangeSearchText = _debounce(() => {
    loadCourses(params.value)
}, 500)

onMounted(async () => {
    await loadCourses(params.value);
})

watch(showNotification, (val) => {
    if(val) {
        setTimeout(() => showNotification.value = false, 1000)
    }
})

watch(search, () => {
    onChangeSearchText()
})
</script>
<template>
    <div class="flex justify-center mb-4">
        <div class="mr-2 lg:w-96">
            <el-input v-model="search" placeholder="Please type search course.." size="large"/>
        </div>
        <button type="button"
            @click="handleClickAddCourse"
            class="rounded-md flex justify-center items-center bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            <PlusCircleIcon class="h-6 w-6 mr-2 flex-shrink-0 rounded-full text-white" alt="" /> Add Course
        </button>
    </div>
    <CourseList :loading="loadingCourses" :courses="courses" />

    <GlobalModal :open-modal="openCreateCoursModal" @closeModal="handleCloseModal" title="Course Details" :show-action-button="false"> 
        <CourseFrom @click-cancel="handleCloseModal" @newCreatedCourse="handleAcceptNewCreatedCourse"/>
    </GlobalModal>


    <GlobalNotification :open-notification="showNotification" @close-notification="handleCloseModal"/>
</template>