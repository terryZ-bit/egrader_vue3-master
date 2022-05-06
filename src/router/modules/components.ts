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
  {
    path: 'teacherNoticePage',
    name: 'teacherNoticePage',
    component: () => import('@/pages/notice/TeacherNoticePage.vue'),
  },
  {
    path: 'teacherFolderManage',
    name: 'teacherFolderManage',
    component: () => import('@/pages/courseFolder/teacherFolderManage.vue'),
  },
  {
    path: 'teacherNewHomework',
    name: 'teacherNewHomework',
    component: () => import('@/pages/homework/TeacherNewHomework.vue'),
  }
  // TODO: 每新增一个base页面的子页面，在这里添加
]
