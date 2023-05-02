import { ref } from "vue"
import { studentEndpoints } from "../endpoints";
import { errorHandler } from "../../../composables/error_handler";
import StudentModel from "../model/StudentModel";

export const updateStudent = async (payload) => {
    const data = ref(null);
    const errorValue = ref(null);
    const isError = ref(false)

    const { data: course, isError: hasError, error } = await new StudentModel(`${studentEndpoints.resource}/${payload.id}`).put(payload)
    if (hasError && error) {
        const { errorResponse } = errorHandler(error);
        errorValue.value = errorResponse
        isError.value = true
    }

    data.value = course

    return { data, isError, errorValue }
}