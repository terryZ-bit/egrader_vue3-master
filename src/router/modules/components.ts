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
  },
  {
    path: 'teacherHomeworkDetail/:teacherHomeworkId',
    name: 'teacherHomeworkDetail',
    component: () => import('@/pages/homework/TeacherHomeworkDetail.vue'),
    props: true,
  },
  {
    path: 'stuHomework',
    name: 'stuHomework',
    component: () => import('@/pages/homework/StuHomework.vue'),
  },
  {
    path: 'stuHomeworkDetail/:teacherHomeworkId',
    name: 'stuHomeworkDetail',
    component: () => import('@/pages/homework/StuHomeworkDetail.vue'),
    props: true,
  },
  {
    path: 'stuNotice/',
    name: 'stuNotice',
    component: () => import('@/pages/notice/StuNoticePage.vue'),
  },
  {
    path: 'stuRateEach/:rateParam',
    name: 'stuRateEach',
    component: () => import('@/pages/homework/StuRateEach.vue'),
    props: true,
  },
  {
    path: 'StuRateDetail/:rateParam/:homeworkParam',
    name: 'stuRateDetail',
    component: () => import('@/pages/homework/StuRateDetail.vue'),
    props: true,
  },
  // TODO: 每新增一个base页面的子页面，在这里添加
]
