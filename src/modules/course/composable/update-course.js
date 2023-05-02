import { ref } from "vue"
import CourseModel from "../model/CourseModel";
import { courseEndpoints } from "../endpoints";
import { errorHandler } from "../../../composables/error_handler";

export const updateCourse = async (payload) => {
    const data = ref(null);
    const errorValue = ref(null);
    const isError = ref(false)

    const { data: course, isError: hasError, error } = await new CourseModel(`${courseEndpoints.resource}/${payload.id}`).put(payload)
    if (hasError && error) {
        const { errorResponse } = errorHandler(error);
        errorValue.value = errorResponse
        isError.value = true
    }

    data.value = course

    return { data, isError, errorValue }
}