import { ref } from "vue"
import CourseModel from '../model/CourseModel'
import { errorHandler } from "../../../composables/error_handler";
import { courseEndpoints } from "../endpoints";
export const fetCourses = () => {
    const data = ref([]);
    const loading = ref(false);
    const isError = ref(false)
    
    const load = async (params) => {
        loading.value = true;
        const { data: courses, isError: errorCourse, error } = await new CourseModel(courseEndpoints.resource).get(params);
        loading.value = false;
        if(errorCourse && error) {
            errorHandler(error);
            isError.value = true;
        }

        data.value = courses.data

    }

    return {
        load,
        data, 
        loading,
        isError
    }
}

export const fetchCoure = () => {
    const data = ref(null);
    const loading = ref(false);
    const isError = ref(false)

    const load = async (id) => {
        loading.value = true;
        const {data: course, isErrorCourse, error} = await new CourseModel(`${courseEndpoints.resource}/${id}`).get()
        loading.value = false;
        if(isErrorCourse && error) {
            errorHandler(error);
            isError.value = true
        }

        data.value = course;
    }

    return {
        load, 
        data, 
        loading,
        isError
    }
}