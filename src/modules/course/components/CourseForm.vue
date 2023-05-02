<script setup>
import { ref, defineEmits, defineProps, computed, onMounted } from 'vue';
import { storeCourse } from '../composable/store-course';
import { updateCourse } from '../composable/update-course';
import ErrorSpan from '../../../components/ErrorSpan.vue';

const props = defineProps({
    courseData: {
        type: Object,
        default: () => {}
    }
})

const emit = defineEmits(['clickCancel', 'newCreatedCourse', 'updatedCourse'])

const course = ref({
    name: '',
    student_capacity: null,
    min_gpa: null
})
const courseData = computed(() => props.courseData)
const errorData = ref(null)

const handleClickSave = async () => {
    errorData.value = null;

    if(course.value && course.value.id) {
        updateCourseData();
        return;
    }

    const { data, errorValue } = await storeCourse(course.value)
    if(errorValue.value) { 
        errorData.value = errorValue.value
        return;
    }

    emit('newCreatedCourse', data.value)
}

const updateCourseData = async () => {
    const { data, isError, errorValue } = await updateCourse(course.value)
    if(isError.value && errorValue.value) {
        errorData.value = errorValue.value
        return
    }
    emit('updatedCourse', data.value)
}

const handleClickCancel = () => {
    emit('clickCancel')
}
onMounted(() => {
    course.value = {...courseData.value}
})
</script>
<template>
    <div class="p-2">
        <div class="grid lg:grid-cols-2 gap-4">
            <div class="col-span-2">
                <label for="">Name</label>
                <el-input v-model="course.name" placeholder="Please input course name" size="large"/>
                <ErrorSpan 
                    v-if="errorData && errorData.errors && errorData.errors.name" 
                    :message="errorData.errors.name[0]"/>
            </div>
            <div class="col-span-2">
                <label for="">Student Capacity</label>
                <div class="w-full">
                    <el-input-number v-model="course.student_capacity" size="large" :min="1" />
                </div>
                <ErrorSpan 
                    v-if="errorData && errorData.errors && errorData.errors.student_capacity" 
                    :message="errorData.errors.student_capacity[0]"/>
            </div>
            <div class="col-span-2">
                <label for="">Minimum GPA</label>
                <div class="w-full">
                    <el-input-number v-model="course.min_gpa" size="large" :min="1" />
                </div>
                <ErrorSpan 
                    v-if="errorData && errorData.errors && errorData.errors.min_gpa" 
                    :message="errorData.errors.min_gpa[0]"/>
            </div>
            <div class="col-span-2">
                <div class="w-full flex items-end justify-center">
                    <button type="button"
                        @click="handleClickCancel"
                        class="rounded-md flex mr-2 justify-center items-center bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-800 shadow-md hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Cancel
                    </button>
                    <button type="button"
                        @click="handleClickSave"
                        class="rounded-md flex justify-center items-center bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Save
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>