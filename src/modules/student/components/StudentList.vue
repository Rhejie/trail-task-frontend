<script setup>
import { defineProps, computed, ref, onMounted, watch } from 'vue';
import { fetchStudents } from '../composable/get-students'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { EllipsisVerticalIcon } from '@heroicons/vue/20/solid'
import { debounce as _debounce } from 'lodash'
import { PlusCircleIcon } from '@heroicons/vue/24/outline';
import GlobalModal from '../../../components/popup/GlobalModal.vue';
import StudentForm from './StudentForm.vue';
import GlobalNotification from '../../../components/popup/GlobalNotification.vue';
const props = defineProps({
    courseId: {
        type: Number,
        default: null
    },
    showAddStudent: {
        type: Boolean,
        default: false
    }
})

const courseId = computed(() => props.courseId)
const showAddStudent = computed(() => props.showAddStudent)
const page = ref(1)
const limit = ref(10);
const search = ref('')
const openStudentModal = ref(false)
const showNotification = ref(false)
const message = ref('')
const studentParams = computed(() => {
    return {
        course_id: courseId.value,
        limit: limit.value,
        page: page.value,
        search: search.value
    }
})

const { load: loadStudents, data: students, loading: loadingStudents } = fetchStudents();

const handleClickStudent = () => {
    openStudentModal.value = true;
}

const handleCloseModal = () => {
    openStudentModal.value = false
    showNotification.value = false
}

const handleAcceptNewCreatedStudent = (newlyCreatedStudent) => {
    students.value.unshift(newlyCreatedStudent)
    openStudentModal.value = false;
    showNotification.value = true
    message.value = 'Saved Successfully'
}

const onChangeSearchText = _debounce( async () => {
    await loadStudents(studentParams.value)
}, 500)

onMounted(async () => {
    await loadStudents(studentParams.value);
})

watch(search, () => {
    onChangeSearchText()
})

watch(showNotification, (val) => {
    if(val) {
        setTimeout(() => {
            showNotification.value = false
        }, 2000)
    }
})
</script>
<template>
    <h1>Students</h1>
    <div class="flex">
        <div class="mr-2 lg:w-96">
            <el-input v-model="search" placeholder="Please type search students.." size="large"/>
        </div>
        <button type="button"
            v-if="showAddStudent"
            @click="handleClickStudent"
            class="rounded-md flex justify-center items-center bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            <PlusCircleIcon class="h-6 w-6 mr-2 flex-shrink-0 rounded-full text-white" alt="" /> Add Student
        </button>
    </div>
    <div class=" overflow-y-auto h-screen">
        <ul role="list" class="divide-y divide-gray-100">
            <li v-for="student in students" :key="student.email" class="flex justify-between gap-x-6 py-5">
                <div class="flex gap-x-4">
                    <lord-icon src="https://cdn.lordicon.com/imamsnbq.json" trigger="loop" delay="2000"
                        colors="primary:#121331,secondary:#08a88a" class="h-12 w-12 flex-none rounded-full bg-gray-50">
                    </lord-icon>
                    <div class="min-w-0 flex-auto">
                        <p class="text-sm font-semibold leading-6 text-gray-900">
                            <p class="hover:underline">{{ student.name }}</p>
                        </p>
                        <p class="mt-1 flex text-xs leading-5 text-gray-500">
                            <span class="truncate hover:underline">{{ student.gpa }}</span>
                        </p>
                    </div>
                </div>
                <div class="flex items-center gap-x-6">
                    <div class="hidden sm:flex sm:flex-col sm:items-end">
                        <p class="mt-1 text-xs leading-5 text-gray-500">
                            Course Enrolled: <span class="font-bold">{{ student.course_count ? student.course_count : '---' }}</span>
                        </p>
                        </div>
                    <Menu as="div" class="relative flex-none">
                        <MenuButton class="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                            <span class="sr-only">Open options</span>
                            <EllipsisVerticalIcon class="h-5 w-5" aria-hidden="true" />
                        </MenuButton>
                        <transition enter-active-class="transition ease-out duration-100"
                            enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                            leave-active-class="transition ease-in duration-75"
                            leave-from-class="transform opacity-100 scale-100"
                            leave-to-class="transform opacity-0 scale-95">
                            <MenuItems
                                class="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                <MenuItem v-slot="{ active }">
                                <button href="#"
                                    :class="[active ? 'bg-gray-50' : '', 'block px-3 py-1 text-sm leading-6 text-gray-900 w-full text-justify items-center']">
                                    View
                                </button>
                                </MenuItem>
                                <MenuItem v-slot="{ active }">
                                <a href="#"
                                    :class="[active ? 'bg-gray-50' : '', 'block px-3 py-1 text-sm leading-6 text-gray-900']">Message<span
                                        class="sr-only">, {{ student.name }}</span></a>
                                </MenuItem>
                            </MenuItems>
                        </transition>
                    </Menu>
                </div>
            </li>
        </ul>
    </div>

    
    <GlobalModal 
        :open-modal="openStudentModal" 
        @closeModal="handleCloseModal" 
        title="Student Details" 
        :show-action-button="false"> 
        <StudentForm 
            @click-cancel="handleCloseModal" 
            @newCreatedStudent="handleAcceptNewCreatedStudent"/>
    </GlobalModal>
    
    <GlobalNotification 
        :open-notification="showNotification" 
        :title="message"
        @close-notification="handleCloseModal"/>
</template>
