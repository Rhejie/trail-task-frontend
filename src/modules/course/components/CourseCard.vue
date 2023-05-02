<script setup>
import { defineProps, computed, ref, onMounted, watch } from 'vue';
import CourseForm from './CourseForm.vue';
import GlobalNotification from '../../../components/popup/GlobalNotification.vue';
import GlobalConfirmation from '../../../components/popup/GlobalConfirmation.vue';
import { useRouter } from 'vue-router';
import { deleteCourse } from '../composable/delete-course';
const props = defineProps({
    course: {
        type: Object,
        default: () => { }
    },
    loading: {
        type: Boolean,
        default: false
    }
})

const router = useRouter();
const course = computed(() => props.course)
const loading = computed(() => props.loading)
const editMode = ref(false)
const courseData = ref(null)
const showNotification = ref(false)
const message = ref('')
const showDeleteConfirmation = ref(false)

const handleClickEdit = () => {
    editMode.value = true
    courseData.value = {...course.value}
    if(!editMode.value) {
        editMode.value = false
    }
}

const handleClickDelete = () => {
    showDeleteConfirmation.value = true
}

const handleClickCancel = () => {
    editMode.value = false

}

const handleUpdatedCourse = (updatedCourse) => {
    courseData.value = {...updatedCourse}
    showNotification.value = true
    message.value = 'Updated Successfully'
    editMode.value = false
}

const handleCloseNotification = () => {
    showNotification.value = false
}

const handleClickCancelConfirmation = () => {
    showDeleteConfirmation.value = false
}

const handleClickConfirmedDelete = async (selectedToBeDelete) => {
    await deleteCourse(selectedToBeDelete.id);
    showDeleteConfirmation.value = false
    showNotification.value = true
    message.value = 'Deleted Successfully'
    router.push({ name: 'Course Home Page'})
}

onMounted(() => {
    if(course.value && course.value.id) {
        console.log(course.value)
    }
})

watch(course, () => {
    courseData.value = {...course.value}
})

watch(showNotification, (val) => {
    if(val) {
        setTimeout(() => showNotification.value = false, 1000)
    }
})
</script>
<template>
    <div v-if="courseData && courseData.id && !loading">
        <div class="px-4 sm:px-0">
            <h3 class="text-base font-semibold leading-7 text-gray-900">Course Information</h3>
            <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Course details and application.</p>
        </div>
        <div class="mt-6 border-t border-gray-100" v-if="!editMode">
            <dl class="divide-y divide-gray-100">
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt class="text-sm font-medium leading-6 text-gray-900">Name</dt>
                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ courseData.name }}</dd>
                </div>
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt class="text-sm font-medium leading-6 text-gray-900">Student Capacity</dt>
                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ courseData.student_capacity }}
                    </dd>
                </div>
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt class="text-sm font-medium leading-6 text-gray-900">Total Enrolled</dt>
                    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{{ courseData.students_count }}</dd>
                </div>
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <div class="w-full flex items-end justify-center">
                        <button type="button" @click="handleClickDelete"
                            class="rounded-md flex mr-2 justify-center items-center bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-800 shadow-md hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Delete
                        </button>
                        <button type="button" @click="handleClickEdit"
                            class="rounded-md flex justify-center items-center bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Edit
                        </button>
                    </div>
                </div>

            </dl>
        </div>
        <div v-else>
            <CourseForm :course-data="courseData" @clickCancel="handleClickCancel" @updatedCourse="handleUpdatedCourse"/>
        </div>
    </div>
    <div v-else>
        <p>loading.....</p>
    </div>
    
    <GlobalNotification 
        :open-notification="showNotification" 
        :title="message"
        @close-notification="handleCloseNotification"/>
    
    <GlobalConfirmation 
        :open-confirmation="showDeleteConfirmation" 
        @clickCancel="handleClickCancelConfirmation" 
        @clickConfirmed="handleClickConfirmedDelete"
        :selected-value="courseData"/>
</template>