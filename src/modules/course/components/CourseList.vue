<script setup>
import { AcademicCapIcon } from '@heroicons/vue/20/solid'
import { EyeIcon, PlusCircleIcon } from '@heroicons/vue/24/outline';

import { defineProps, computed, ref, watch } from 'vue';
import GlobalModal from '../../../components/popup/GlobalModal.vue';
import EnrollStudentCard from './EnrollStudentCard.vue';
import GlobalNotification from '../../../components/popup/GlobalNotification.vue';

const props = defineProps({
    courses: {
        type: Array,
        default: () => []
    },
    loading: {
        type: Boolean,
        default: false
    }
})

const courses = computed(() => props.courses);
const loading = computed(() => props.loading);
const openEnrollStudentModal = ref(false)
const selectedCourse = ref(null)
const showNotification = ref(false)
const message = 'Enrolled Successfully'

const handleCloseModal = () => {
    openEnrollStudentModal.value = false;
    showNotification.value = false
}

const handleUpdatedCourse = (updatedCourse) => {
    let courseIndex = courses.value.findIndex(course => course.id === updatedCourse.id);
    courses.value.splice(courseIndex, 1, updatedCourse);
    openEnrollStudentModal.value = false
    showNotification.value = true
}

const handleClickEnrollStudent = (course) => {
    selectedCourse.value = course
    openEnrollStudentModal.value = true
}

watch(showNotification, (val) => {
    if(val) {
        setTimeout(() => {
            showNotification.value = false
        }, 2000)
    }
})
</script>
<template>
    <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="course in courses" :key="course.id"
            class="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
            <div class="flex w-full items-center justify-between space-x-6 p-6">
                <div class="flex-1 truncate">
                    <div class="flex items-center space-x-3">
                        <h3 class="truncate text-sm font-medium text-gray-900">{{ course.name }}</h3>
                        <span
                            class="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">{{
                                course.student_capacity }}</span>
                    </div>
                    <p class="mt-1 truncate text-sm text-gray-500">Enrolled Students {{ course.students_count }}</p>
                    <p class="mt-1 truncate text-sm text-gray-500">Minimum GPA {{ course.min_gpa }}</p>
                </div>
                <!-- <AcademicCapIcon class="h-16 w-16 flex-shrink-0 rounded-full bg-gray-300" alt="" /> -->
                <lord-icon src="https://cdn.lordicon.com/wxnxiano.json" trigger="loop" delay="1000"
                    colors="primary:#08a88a,secondary:#121331" class="w-16 h-16">
                </lord-icon>
            </div>
            <div>
                <div class="-mt-px flex divide-x divide-gray-200">
                    <div class="flex w-0 flex-1">
                        <router-link :to="{
                            name: 'View Course Page',
                            params: {
                                id: course.id
                            }
                        }"
                            class="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                            <EyeIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                            View
                        </router-link>
                    </div>
                    <div class="-ml-px flex w-0 flex-1">
                        <button type="button"
                            @click="handleClickEnrollStudent(course)"
                            class="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                            <PlusCircleIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                            Enroll Student
                        </button>
                    </div>
                </div>
            </div>
        </li>
    </ul>
    
    <GlobalModal :open-modal="openEnrollStudentModal" @closeModal="handleCloseModal" title="Enroll Student" :show-action-button="false"> 
        <EnrollStudentCard 
            :selected-course="selectedCourse" 
            @clickCancel="handleCloseModal"
            @updatedCourse="handleUpdatedCourse"/>
    </GlobalModal>  
    
    <GlobalNotification :open-notification="showNotification" :title="message" @close-notification="handleCloseModal"/>
</template>