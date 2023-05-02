
import { ref } from "vue"
import { errorHandler } from "../../../composables/error_handler"
import { courseEndpoints } from "../endpoints"
import CourseModel from "../model/CourseModel"

export const enrollStudent = async (params) => {
    const data = ref(null)
    const errorValue = ref(null)
    const { data: course, isError, error } = await new CourseModel(courseEndpoints.enrollStudent).post(params)
    if(isError && error) {
        const { errorResponse } = errorHandler(error);
        errorValue.value = errorResponse
    }
    data.value = course
    return {
        data,
        errorValue
    }
}