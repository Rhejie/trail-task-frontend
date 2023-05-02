const moduleRoute = {
    path: '/students',
    component: () => import('./StudentModule.vue'),
    children: [
        {
            path: '',
            name: 'Student Home Page',
            component: () => import('./views/StudentHomePage.vue'),
            meta: {
              header: 'Students'
            }
        },
    ],
}

export default router => {
    router.addRoute(moduleRoute)
}