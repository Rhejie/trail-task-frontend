<script setup>
import { defineProps, defineEmits, ref, onMounted, computed, watch } from 'vue';
import { fetchStudents } from '../../student/composable/get-students';
import { fetchStudent } from '../../student/composable/get-student'
import StudentForm from '../../student/components/StudentForm.vue'
import ErrorSpan from '../../../components/ErrorSpan.vue';
import { enrollStudent } from '../composable/enroll-student'
const props = defineProps({
    selectedCourse: {
        type: Object,
        default: () => { }
    }
})

const emit = defineEmits(['clickCancel', 'updatedCourse'])


const studentParams = computed(() => {
    return {
        limit: 100,
        page: 1,
        search: search.value
    }
})
const { load: loadStudents, data: students, loading: loadingStudents } = fetchStudents();

const selectedStudentId = ref(null)
const search = ref('')
const selectedCourse = computed(() => props.selectedCourse)
const selectedStudentProfile = ref({
    name: '',
    gpa: null
})
const loadingStudent = ref(false)
const errorData = ref(null)
const loadingEnroll = ref(false)

const remoteMethod = async (query) => {
    if (query) {
        search.value = query
        await loadStudents(studentParams.value)
    }
    else {
        search.value = ''
        await loadStudents(studentParams.value)
    }
}

const handleClickCancel = () => {
    emit('clickCancel')
}

const handleClickSave = async () => {
    errorData.value = null
    loadingEnroll.value = true
    let params = {
        course: selectedCourse.value,
        course_id: selectedCourse.value.id,
        student_gpa: selectedStudentProfile.value.gpa,
        student_name: selectedStudentProfile.value.name,
        student_id: selectedStudentProfile.value.id
    }

    const { data, errorValue } = await enrollStudent(params);
    if(errorValue) {
        errorData.value = errorValue.value
        return 
    }
    emit('updatedCourse', data.value)
}

const getStudentProfile = async () => {
    loadingStudent.value = true
    const { data } = await fetchStudent(selectedStudentId.value)
    selectedStudentProfile.value = data
    loadingStudent.value = false
}

onMounted(async () => {
    await loadStudents(studentParams.value)
})

watch(selectedStudentId, (val) => {
    getStudentProfile();
})
</script>
<template>
    <div class="p-2">
        <ErrorSpan v-if="errorData && errorData.errors && errorData.errors.course"
                        :message="errorData.errors.course[0]" />
        <p class="text-xs"> Course: {{ selectedCourse.name }}</p>
        <p class="text-xs"> Capacity: {{ selectedCourse.student_capacity }} Students</p>
        <p class="text-xs"> Enrolled: {{ selectedCourse.students_count }} Students</p>
        <p class="text-xs"> Minimum GPA: {{ selectedCourse.min_gpa }}</p>
        <div class="w-full mt-5">
            <label for="" class="text-left">Search Students</label>
            <el-select v-model="selectedStudentId" class="w-full " :multiple="false" clearable filterable remote size="large"
                reserve-keyword placeholder="Please type to search students..." :persistent="false"
                :remote-method="remoteMethod" :loading="loadingStudents">
                <el-option v-for="student in students" :key="student.id" :label="student.name" :value="student.id" />
            </el-select>
        </div>
        <div class="py-5">
            <div class="justify-center items-center border-b border-gray-300">
                Student Profile
            </div>
        </div>
        <div class="w-full mt-2">
            <div class="grid lg:grid-cols-2 gap-4">
                <div class="col-span-2">
                    <label for="">Name</label>
                    <el-input :disabled="selectedStudentProfile.id ? true : false" v-model="selectedStudentProfile.name" placeholder="Please input student name" size="large" />
                    <ErrorSpan v-if="errorData && errorData.errors && errorData.errors.student_name"
                        :message="errorData.errors.student_name[0]" />
                </div>
                <div class="col-span-2">
                    <label for="">GPA</label>
                    <div class="w-full">
                        <el-input-number :disabled="selectedStudentProfile.id ? true : false" v-model="selectedStudentProfile.gpa" size="large" :precision="2" :step="0.1" :min="1" />
                    </div>
                    <ErrorSpan v-if="errorData && errorData.errors && errorData.errors.student_gpa"
                        :message="errorData.errors.student_gpa[0]" />
                </div>
            </div>
        </div>
        <div class="col-span-2 mt-5">
            <div class="w-full flex items-end justify-center">
                <button type="button" @click="handleClickCancel"
                    class="rounded-md flex mr-2 justify-center items-center bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-800 shadow-md hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Cancel
                </button>
                <button type="button" @click="handleClickSave"
                    class="rounded-md flex justify-center items-center bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Enroll
                </button>
            </div>
        </div>
    </div>
</template>