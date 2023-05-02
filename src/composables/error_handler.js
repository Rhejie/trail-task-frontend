import { useRouter } from "vue-router";

export const errorHandler = (error) => {
    const router = useRouter();
    let errorValue = null;
    switch (error.response.status) {
        case 422:
            errorValue = error.response.data
            break;
        
        case 401:
            errorValue = error.response.data;
            break;

        case 404:
            router.push('/404')
            break;
    
        default:
            alert('Some error occured, please contact the administrator')
            break;
    }

    return {
        errorResponse: errorValue,
        error
    }
}