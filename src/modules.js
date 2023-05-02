
import { registerModules } from './registerModules'
import courseModule from './modules/course'
import studentModule from './modules/student'

registerModules({
    course: courseModule,
    student: studentModule
});