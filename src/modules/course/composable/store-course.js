import { ref } from 'vue';
import { courseEndpoints } from '../endpoints';
import CourseModel from '../model/CourseModel'
import { errorHandler } from '../../../composables/error_handler';

export const storeCourse = async (payload) => {
    const data = ref(null);
    const errorValue = ref(null)
    const { data: course, isError, error } = await new CourseModel(courseEndpoints.resource).post(payload);
    if(isError && error) {
        const { errorResponse } = errorHandler(error);
        errorValue.value = errorResponse
    }
    
    data.value = course

    return { 
        data, 
        errorValue, 
    }
}