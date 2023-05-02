import { errorHandler } from "../../../composables/error_handler";
import { courseEndpoints } from "../endpoints"
import CourseModel from "../model/CourseModel"

export const deleteCourse = async (id) => {
    const { data , isError, error} = await new CourseModel(`${courseEndpoints.resource}/${id}`).destroy();
    if(isError && error) {
        errorHandler(error);
    }

    return { 
        data
    }
}