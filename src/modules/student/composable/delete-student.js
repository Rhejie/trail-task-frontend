import { errorHandler } from "../../../composables/error_handler";
import { studentEndpoints } from "../endpoints"
import StudentModel from "../model/StudentModel";

export const deleteStudent = async (id) => {
    const { data , isError, error} = await new StudentModel(`${studentEndpoints.resource}/${id}`).destroy();
    if(isError && error) {
        errorHandler(error);
    }

    return { 
        data
    }
}