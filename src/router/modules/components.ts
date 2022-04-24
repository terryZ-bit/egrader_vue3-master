/**
 * 存放base子页面路由
 */
export default [
  {
    path: 'teacherHomework',
    name: 'teacherHomework',
    component: () => import('@/pages/homework/TeacherHomework.vue'),
  },
  {
    path: 'teacherCourse',
    name: 'teacherCourse',
    component: () => import('@/pages/course/TeacherCourse.vue'),
  },
  // TODO: 每新增一个base页面的子页面，在这里添加
]
