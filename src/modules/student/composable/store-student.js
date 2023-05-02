import { ref } from 'vue';
import { studentEndpoints } from '../endpoints';
import { errorHandler } from '../../../composables/error_handler';
import StudentModel from '../model/StudentModel';

export const storeStudent = async (payload) => {
    const data = ref(null);
    const errorValue = ref(null)
    const { data: course, isError, error } = await new StudentModel(studentEndpoints.resource).post(payload);
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