<script setup>
import { ref, defineEmits, defineProps, computed, onMounted } from 'vue';
import { storeStudent } from '../composable/store-student';
import { updateStudent } from '../composable/update-student';
import ErrorSpan from '../../../components/ErrorSpan.vue';

const props = defineProps({
    studentData: {
        type: Object,
        default: () => {}
    }
})

const emit = defineEmits(['clickCancel', 'newCreatedStudent', 'updatedStudent'])

const student = ref({
    name: '',
    gpa: null,
})
const studentData = computed(() => props.studentData)
const errorData = ref(null)

const handleClickSave = async () => {
    errorData.value = null;

    if(student.value && student.value.id) {
        updateStudentData();
        return;
    }

    const { data, errorValue } = await storeStudent(student.value)
    if(errorValue.value) { 
        errorData.value = errorValue.value
        return;
    }

    emit('newCreatedStudent', data.value)
}

const updateStudentData = async () => {
    const { data, isError, errorValue } = await updateStudent(student.value)
    if(isError.value && errorValue.value) {
        errorData.value = errorValue.value
        return
    }
    emit('updatedStudent', data.value)
}

const handleClickCancel = () => {
    emit('clickCancel')
}
onMounted(() => {
    student.value = {...studentData.value}
})
</script>
<template>
    <div class="p-2">
        <div class="grid lg:grid-cols-2 gap-4">
            <div class="col-span-2">
                <label for="">Name</label>
                <el-input v-model="student.name" placeholder="Please input student name" size="large"/>
                <ErrorSpan 
                    v-if="errorData && errorData.errors && errorData.errors.name" 
                    :message="errorData.errors.name[0]"/>
            </div>
            <div class="col-span-2">
                <label for="">GPA</label>
                <div class="w-full">
                    <el-input-number v-model="student.gpa" size="large" :precision="2" :step="0.1" :min="1" />
                </div>
                <ErrorSpan 
                    v-if="errorData && errorData.errors && errorData.errors.gpa" 
                    :message="errorData.errors.gpa[0]"/>
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