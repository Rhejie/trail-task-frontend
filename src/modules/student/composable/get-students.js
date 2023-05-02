import { ref } from "vue"
import StudentModel from "../../student/model/StudentModel";
import { studentEndpoints } from "../../student/endpoints";
import { errorHandler } from "../../../composables/error_handler";

export const fetchStudents = () => {
    const data = ref([])
    const loading = ref(false);
    const isError = ref(false);

    const load = async (params) => {
        loading.value = true
        const { data: students, isError: errorStudents, error } = await new StudentModel(studentEndpoints.resource).get(params)
        loading.value = false
        if(errorStudents && error ) {
            isError.value = true
            errorHandler(error)
        }

        data.value = students.data
    }

    return {
        load,
        data,
        isError,
        loading
    }
}