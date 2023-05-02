const moduleRoute = {
    path: '/courses',
    component: () => import('./CourseModule.vue'),
    children: [
        {
            path: '',
            name: 'Course Home Page',
            component: () => import('./views/CourseHomePage.vue'),
            meta: {
              header: 'Courses'
            }
        },
        {
            path: '/course/:id',
            name: 'View Course Page',
            component: () => import('./views/ViewCoursePage.vue'),
            props: true,
            meta: {
              header: 'Courses'
            }
        }
    ],
}

export default router => {
    router.addRoute(moduleRoute)
}